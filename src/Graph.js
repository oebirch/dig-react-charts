import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Stage, Layer, Shape, Line, Rect, Text } from "react-konva";
import moment from "moment";

export default function ({
    data,
    labels = [120, 100, 75, 50, 25, 0, -120, -100, -75, -50, -25],
    height = 200,
    decimals = 0,
}) {
    const [componentWidth, setComponentWidth] = useState(null);
    const [chartWidth, setChartWidth] = useState(null);
    const [points, setPoints] = useState([]);
    const containerRef = useRef(null);
    const [pointRects, setPointRects] = useState(null);
    const [textPoints, setTextPoints] = useState(null);
    const [labelPoints, setLabelPoints] = useState(null);
    const [xAxisLine, setXAxisLine] = useState(null);
    const [labelOffsets, setLabelOffsets] = useState(null);

    useEffect(() => {
        if (containerRef.current) {
            setComponentWidth(containerRef.current.offsetWidth);
        }
    }, [containerRef]);

    useEffect(() => {
        if (componentWidth) {
            let Y_PADDING_PERCENTAGE = 0.25;
            let X_PADDING_PIXELS = 30;

            // account for edge cases up here
            if (data.length === 2) {
                X_PADDING_PIXELS = 60;
            }

            let xSpacing =
                (componentWidth - X_PADDING_PIXELS * 2) /
                Math.min(data.length, 2);

            if (data.length === 1) {
                X_PADDING_PIXELS = componentWidth / 2;
                xSpacing = X_PADDING_PIXELS;
            } else if (data.length === 2) {
                xSpacing *= 2;
            }

            // done accounting for edge caeses

            const textHeight = 20;
            const adjustedHeight = height - textHeight;

            const dataValues = data.map((i) => i[1]);
            const newPoints = [];
            let min = Math.max(...dataValues);
            let max = Math.min(...dataValues);

            const dif = max - min;
            let graphMax = max + Y_PADDING_PERCENTAGE * dif;
            let graphMin = min - Y_PADDING_PERCENTAGE * dif;

            // another edge case here
            if (dif === 0 || data.length === 1) {
                let multiplier = 1;
                if (graphMax < 0 && graphMin < 0) {
                    multiplier = -1;
                }
                graphMax = max - multiplier * max * 0.5;
                graphMin = min + multiplier * max * 0.5;
            }

            const getYVal = (y) => {
                const spacingDif = graphMax - graphMin;
                const valuePos = y - graphMin;
                const offset = valuePos / spacingDif;
                return offset * adjustedHeight;
            };

            const getXVal = (x) => {
                return X_PADDING_PIXELS + x * xSpacing;
            };

            const newLabelOffsets = [];
            labels.forEach((label) => {
                const y = getYVal(label);
                if (y < height && y > 0) {
                    newLabelOffsets.push({
                        offset: y / height,
                        label,
                    });
                }
            });

            const newPointRect = [];
            const newTextPoints = [];
            const newLabelPoints = [];
            data.forEach((value, index) => {
                const x = getXVal(index);
                const y = getYVal(value[1]);
                newPoints.push(x);
                newPoints.push(y);
                newPointRect.push([x, y]);
                const xPoint = x - xSpacing / 2;
                newTextPoints.push([
                    [xPoint, adjustedHeight + 6, xSpacing],
                    moment(value[0]).fromNow(),
                ]);

                newLabelPoints.push([
                    [xPoint, y - 25, xSpacing],
                    value[1].toFixed(decimals),
                ]);
            });

            const newChartWidth =
                X_PADDING_PIXELS * 2 + xSpacing * (data.length - 1);

            setChartWidth(newChartWidth);
            setPoints(newPoints);
            setPointRects(newPointRect);
            setTextPoints(newTextPoints);
            setLabelPoints(newLabelPoints);
            setXAxisLine([0, adjustedHeight, newChartWidth, adjustedHeight]);
            setLabelOffsets(newLabelOffsets);
        }
    }, [data, componentWidth, height]);

    return (
        <Wrapper>
            <AxisContainer>
                {labelOffsets &&
                    labelOffsets.map((value, index) => (
                        <Label key={index} offset={value.offset}>
                            {value.label}
                        </Label>
                    ))}
            </AxisContainer>
            <ScrollableContainer
                id="scrollableChart"
                height={height}
                ref={containerRef}>
                <ChartContainer>
                    {chartWidth && (
                        <Stage width={chartWidth} height={height}>
                            <Layer>
                                {xAxisLine && (
                                    <Line
                                        x={0}
                                        y={0}
                                        strokeWidth={1}
                                        points={xAxisLine}
                                        stroke="#b2b2b2"
                                    />
                                )}

                                {labelPoints &&
                                    labelPoints.map((labelPoint, index) => (
                                        <Text
                                            key={index}
                                            x={labelPoint[0][0]}
                                            y={labelPoint[0][1]}
                                            width={labelPoint[0][2]}
                                            fontSize={15}
                                            fontStyle="bold"
                                            fill="#dc7267"
                                            text={labelPoint[1]}
                                            wrap="char"
                                            align="center"
                                        />
                                    ))}

                                {textPoints &&
                                    textPoints.map((textPoint, index) => (
                                        <Text
                                            key={index}
                                            x={textPoint[0][0]}
                                            y={textPoint[0][1]}
                                            width={textPoint[0][2]}
                                            fontSize={10}
                                            fill="#b2b2b2"
                                            text={textPoint[1]}
                                            wrap="char"
                                            align="center"
                                        />
                                    ))}

                                {pointRects &&
                                    pointRects.map((xy, index) => (
                                        <Rect
                                            key={index}
                                            x={xy[0]}
                                            y={xy[1] - 7}
                                            width={10}
                                            height={10}
                                            rotation={45}
                                            fill="#dc7267"
                                        />
                                    ))}

                                {points && (
                                    <Line
                                        x={0}
                                        y={0}
                                        points={points}
                                        stroke="#dc7267"
                                    />
                                )}
                            </Layer>
                        </Stage>
                    )}
                </ChartContainer>
            </ScrollableContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const AxisContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    width: 30px;
`;

const Label = styled.span`
    position: absolute;
    color: #dc7267;
    top: ${(props) => props.offset * 100}%;
    right: 2px;
    transform: translateY(-50%);
    font-weight: 500;
`;

const ScrollableContainer = styled.div`
    direction: rtl;
    display: flex;
    position: relative;
    height: ${(props) => props.height}px;
    width: 100%;
    overflow: scroll;
`;

const ChartContainer = styled.div`
    direction: ltr;
`;
