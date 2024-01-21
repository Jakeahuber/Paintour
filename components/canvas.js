import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { Canvas, rect, Box, BoxShadow} from '@shopify/react-native-skia'

export default function Sketch() {
    return (
        <SafeAreaView>
            <Canvas style={{width: 300, height: 300}}>
                <Box color="blue" box={rect(0,0,290,290)}>
                    <BoxShadow dx={0} dy={0} color="black" blur={10} />
                </Box>
            </Canvas>
        </SafeAreaView>
    );
}