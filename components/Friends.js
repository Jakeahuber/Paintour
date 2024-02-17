import React, { useState } from "react";
import {View, Text} from 'react-native';
import Canvas from './Canvas'
import { state } from '../state';
import { useSnapshot } from 'valtio';

export default function Friends({}) {
    const snap = useSnapshot(state);
    return(
        <>
            <Canvas />
        </>
    )
}