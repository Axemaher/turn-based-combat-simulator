import React, { useState } from "react";
import styled from 'styled-components';
import AbilityInfo from '../../../components/AbilityInfo';
import atkIco from '../../../assets/ATKdark.png';



const StyledAttacksList = styled.ul`
    position: relative;
    padding: 0;
    display: flex;
    flex-basis: auto;
    list-style: none;
`;

const AttackWrapper = styled.li``;

const StyledButtonUse = styled.button`
    background-color: transparent;
    border: none;
    text-align: left;
    display: flex; 
    justify-content: center;
    align-items: center;
    transition: all .2s;
    color: ${({ theme }) => theme.colors.font};
    background-image: url(${atkIco});
    background-size: cover;
    background-position: center;
    width: 56px;
    height: 56px;
    margin: 0 2px;
    position: relative;
    cursor: pointer;
`;

const AttackImg = styled.div`
    background-image: url(${({ img }) => img});
    opacity: ${({ disabled }) => disabled ? '.3' : '1'};
    background-position: center;
    background-size: cover;
    width: 70%;
    height: 70%;
`;

const AttacksList = ({ attacks }) => {

    const [hoverIndex, setHoverIndex] = useState(null);

    const handleOnClick = (index) => {
        setHoverIndex(index)
    }

    const handleOnKeyDown = (index, attack, e) => {
        if (e.key === 'Enter') {
            handleOnClick(attack)
        }
        if (e.key === 'i') {
            setHoverIndex(hoverIndex === null ? index : null)
        }
    }

    return (
        <StyledAttacksList>
            {attacks.map((attack, index) => (
                <AttackWrapper
                    key={attack.id + index}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    <StyledButtonUse
                        onClick={() => handleOnClick(index)}
                        onKeyDown={(e) => handleOnKeyDown(index, attack, e)}
                    >
                        <AttackImg
                            img={require(`../../../assets/abilities/${attack.id}.png`)}
                        />
                    </StyledButtonUse>
                    <AbilityInfo
                        alignment={'characterSelect'}
                        visible={hoverIndex === index}
                        abilityInfo={attack}
                        setHoverIndex={setHoverIndex}
                    />
                </AttackWrapper>
            ))
            }
        </StyledAttacksList >
    );
}

export default AttacksList;