import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const lastEval="";

  const handleInput = (value) => {
    //setResult("");
    
    if (value === "+/-") {
      setInput((prev) => (prev ? (-1 * parseFloat(prev)).toString() : ""));
    } else if (value === "()") {
      setInput((prev) => {
        const openParens = (prev.match(/\(/g) || []).length;
        const closeParens = (prev.match(/\)/g) || []).length;
        if (openParens > closeParens) {
          return prev + ")";
        } else {
          return prev + "(";
        }
      });
    } else if (value === "%") {
      setInput((prev) => (prev ? (parseFloat(prev) / 100).toString() : ""));
    } else {
      setInput((prev) => prev + value);
      if (!["/", "*", "-", "+", "="].includes(value)) {
        calculateResult(value);
      }

    }
    
  };

  const calculateResult = (value) => {
    //clearIslem();
    try {
      setResult(eval(input+value).toString());
    } catch (e) {
      setResult("");
    }
  };

  const showResult = () => {
    //clearIslem();
    try {
      setInput(eval(input).toString());
      setResult("")
    } catch (e) {
      setResult("Hatalı Biçim");
    }
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  const clearIslem = () => {
    setInput("");
  };

  const getTextStyle = (item) => {
    if (["C"].includes(item)) {
      return styles.clearText;
    } else if (["/", "*", "-", "+", "=", "()", "%"].includes(item)) {
      return styles.operatorText;
    } else {
      return styles.buttonText;
    }
  };

  const getButtonStyle = (item) => {
    if (["="].includes(item)) {
      return styles.equalsButton;
    }
    else {
      return styles.button;
    }
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
    try {
      setResult(eval(input.slice(0, -1)));
    } catch (e) {
      setResult("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.inputText}>{input}</Text>
        <Text style={styles.resultText}>{result}</Text>
        <Text style={styles.silText} onPress={handleBackspace}>⌫</Text>
      </View>
      <View style={styles.buttons}>
        {[
          ['C', '()', '%', '/'],
          ['7', '8', '9', '*'],
          ['4', '5', '6', '-'],
          ['1', '2', '3', '+'],
          ['+/-', '0', '.', '=']
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <TouchableOpacity
                key={item}
                
                style={[styles.button,getButtonStyle(item)]}
                onPress={() => {
                  if (item === 'C') clearInput();
                  else if (item === '=') showResult();
                  else handleInput(item);
                }}
              >
                <Text style={[styles.buttonText,getTextStyle(item)]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  display: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#393939',
    padding: 20,
  },
  inputText: {
    fontSize: 36,
    color: '#fff',
  },
  resultText: {
    fontSize: 30,
    color: '#888',
  },
  buttons: {
    flex: 5,
    padding: 10,
    backgroundColor: '#333333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  equalsButton: {
    flex: 1,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#cd6600',
    borderRadius: 100,
  },
  
  button: {
    flex: 1,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#3f3f3f',
    borderRadius: 100,
  },
  operatorText: {
    fontSize: 24,
    color: '#97ffff',
  },
  silText: {
    fontSize: 20,
    color: '#97ffff',
  },
  clearText: {
    fontSize: 24,
    color: '#ff7f00',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});
