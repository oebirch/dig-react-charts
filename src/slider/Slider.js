import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function ({ min, max, step, value, decimals = 1 }) {
    const [notchCount, setNotchCount] = useState(null);
    const [valueOffsetPercentage, setValueOffsetPercentage] = useState(0.34);
    const [notchWidth, setNotchWidth] = useState(null);

    useEffect(() => {
        const dif = max - min;
        const count = Math.floor(dif / step);
        const roundedDif = count * step;
        const roundedMax = roundedDif + min;
        setNotchCount(count);
        setNotchWidth(roundedDif / count);
        const adjustedMax = roundedMax - min;
        const adjustedValue = value - min;
        const valuePercent = adjustedValue / adjustedMax;
        setValueOffsetPercentage(Math.min(valuePercent, 1));
    }, [min, max, step, value]);

    const getLabelString = (offsetIndex) => {
        return (min + notchWidth * offsetIndex).toFixed(decimals);
    };

    return (
        <Container>
            <Row />
            {setNotchCount &&
                [...Array(notchCount + 1)].map((p, index) => (
                    <Notch offset={index / notchCount} />
                ))}
            {setNotchCount &&
                [...Array(notchCount + 1)].map((p, index) => (
                    <Label offset={index / notchCount}>
                        {getLabelString(index)}
                    </Label>
                ))}
            {valueOffsetPercentage && <Dot offset={valueOffsetPercentage} />}
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    height: 45px;
`;

const Label = styled.div`
    position: absolute;
    left: ${(props) => props.offset * 100}%;
    top: 30px;
    transform: translate(-50%, -50%);
    font-size: 15px;
    color: #b2b2b2;
`;

const Row = styled.div`
    position: absolute;
    background-color: #b2b2b2;
    top: 10px;
    transform: translateY(-50%);
    height: 3px;
    width: 100%;
`;

const Notch = styled.div`
    position: absolute;
    background-color: #b2b2b2;
    left: ${(props) => props.offset * 100}%;
    top: 10px;
    transform: translate(-50%, -50%) rotate(45deg);
    height: 8px;
    width: 8px;
`;

const Dot = styled.div`
    position: absolute;
    background-color: #dc7267;
    left: ${(props) => props.offset * 100}%;
    top: 10px;
    transform: translate(-50%, -50%);
    height: 15px;
    width: 15px;
    border-radius: 100%;
`;
