import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Constants from "expo-constants";
import DisplayResults from "./DisplayResults";
import Actions from "./Actions";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RockPaper() {
  const [userChoice, setUserChoice] = useState(0);
  const [computerChoice, setComputerChoice] = useState(0);
  const [result, setResult] = useState("");
  const [canPlay, setCanPlay] = useState(true);

  //for animation
  const fadeAnimation = useRef(new Animated.Value(1).current);

  function play(choice) {
    // we have choice
    // 1. rock
    // 2. scissors
    // 3. paper

    const randomComputerChoice = Math.floor(Math.random() * 3) + 1;
    let resultString = "";

    if (choice === 1) {
      resultString = randomComputerChoice === 3 ? "Win" : "Lose";
    } else if (choice === 2) {
      resultString = randomComputerChoice === 1 ? "Win" : "Lose";
    } else {
      resultString = randomComputerChoice === 2 ? "Win" : "Lose";
    }

    if (choice === randomComputerChoice) {
      resultString = "Draw";
    }

    setUserChoice(choice);
    setComputerChoice(randomComputerChoice);

    //wait animation hide old result
    setTimeout(() => {
      setResult(resultString);
    }, 300);

    // animation hide
    // Animated.sequence([
    //   Animated.timing(fadeAnimation, {
    //     toValue: 0,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(fadeAnimation, {
    //     toValue: 1,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }),
    // ]).start();

    //disable action when animation running
    setCanPlay(false);
    setTimeout(() => {
      setCanPlay(true);
    }, 600);
  }

  //return the view
  return (
    <SafeAreaView style={[styles.container,result===''||result==='Draw'?styles.resultDraw:result==='Win'?styles.resultWin:styles.resultLose]}>
      <View style={styles.content}>
        <View style={styles.result}>
          <Animated.Text
            style={[styles.resultText]}
          >
            {result}
          </Animated.Text>
        </View>
        <View style={styles.screen}>
          {!result ? (
            <Text style={styles.readyText}>Let's Play</Text>
          ) : (
            <DisplayResults
              userChoice={userChoice}
              computerChoice={computerChoice}
            />
          )}
        </View>
        <Actions play={play} canPlay={canPlay} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  content: {
    flex: 1,
    marginBottom: 5,
    
  },
  result: {
    height: 100,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  resultText: {
    fontSize: 48,
    fontWeight: "bold",
  },
  screen: {
    flex: 1,
    flexDirection: "row",
  },
  readyText: {
    marginTop: -48,
    alignSelf: "center",
    textAlign: "center",
    width: "100%",
    fontSize: 48,
    fontWeight: "bold",
  },
  resultLose:{
    backgroundColor:'rgba(255,0,0,0.4)'
  },
  resultWin:{
    backgroundColor:'rgba(0,135,255,0.4)'
  },
  resultDraw:{
    backgroundColor:'rgba(255,245,202,0.4)'
  }
});
