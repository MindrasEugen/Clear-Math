/**
 * Generatori di Esercizi per ClearMath - Quarta Elementare
 */

import { randomInt, randomChoice, resetRandomSeed } from './random.js';
import { DIFFICULTY, BASE_EXERCISE_COUNT, MIN_TOTAL_EXERCISES } from '../data/constants.js';

function formatNumber(num) {
  return num.toLocaleString('it-IT');
}

// Helper function for GCD
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

export function computeExerciseCount(topicId, selectedTopics, topicDiffs) {
  const diff = topicDiffs[topicId] || DIFFICULTY.LOW;
  const base = BASE_EXERCISE_COUNT[diff];
  if (selectedTopics.size === 0) return base;
  const minPerTopic = Math.ceil(MIN_TOTAL_EXERCISES / selectedTopics.size);
  return Math.max(base, minPerTopic);
}

// ========== 1. NUMERI ==========
export function generateNumeriExercises(diff, count) {
  const exercises = [];
  const wordNumbers = [
    { word: 'duecentocinquantamila trecentosessantuno', num: 250361 },
    { word: 'un milione quattrocentoventiduemila cinquantasei', num: 1422056 },
    { word: 'trecentottomila seicentonovantanove', num: 308699 },
    { word: 'sette milioni ottantamila venti', num: 7080020 }
  ];

  for (let i = 0; i < count; i++) {
    const type = randomInt(0, 3);
    let question, answer;

    if (diff === DIFFICULTY.LOW) {
      const n = randomInt(1000, 99999);
      const positions = ['migliaia', 'centinaia', 'decine di migliaia', 'decine', 'unita'];
      const pos = randomChoice(positions);
      const posIndex = positions.indexOf(pos);
      const nStr = n.toString().padStart(5, '0');
      const digit = nStr[4 - posIndex] || '0';
      const value = parseInt(digit) * Math.pow(10, 4 - posIndex);
      if (type === 0) {
        question = `Qual e il valore delle <b>${pos}</b> in <b>${formatNumber(n)}</b>?`;
        answer = formatNumber(value);
      } else if (type === 1) {
        const parts = [
          parseInt(nStr[0]) * 10000,
          parseInt(nStr[1]) * 1000,
          parseInt(nStr[2]) * 100,
          parseInt(nStr[3]) * 10,
          parseInt(nStr[4])
        ].filter(p => p > 0);
        question = `Scomponi: <b>${formatNumber(n)}</b> = ___ + ___ + ___ + ___ + ___`;
        answer = parts.join(' + ');
      } else if (type === 2) {
        const n2 = randomInt(1000, 99999);
        question = `Confronta: <b>${formatNumber(n)}</b> ⬜ <b>${formatNumber(n2)}</b> (&lt; &gt; =)`;
        answer = n > n2 ? '>' : n < n2 ? '<' : '=';
      } else {
        question = `Predecessore e successore di <b>${formatNumber(n)}</b>: ___ , ${formatNumber(n)} , ___`;
        answer = `${n - 1}, ${n + 1}`;
      }
    } else if (diff === DIFFICULTY.MID) {
      const n = randomInt(100000, 999999);
      const nStr = n.toString().padStart(6, '0');
      const parts = [
        parseInt(nStr.substring(0, 3)) * 1000,
        parseInt(nStr[3]) * 100,
        parseInt(nStr[4]) * 10,
        parseInt(nStr[5])
      ].filter(p => p > 0);
      if (type === 0) {
        question = `Scomponi: <b>${formatNumber(n)}</b> = ___ migliaia + ___ centinaia + ___ decine + ___ unita`;
        answer = parts.join(' + ');
      } else if (type === 1) {
        const nums = [randomInt(100000, 999999), randomInt(100000, 999999), randomInt(100000, 999999)];
        question = `Ordina dal minore al maggiore: ${nums.map(x => formatNumber(x)).join(' - ')}`;
        const sorted = [...nums].sort((a, b) => a - b);
        answer = sorted.map(x => formatNumber(x)).join(' < ');
      } else if (type === 2) {
        const to = randomChoice([1000, 10000]);
        question = `Arrotonda <b>${formatNumber(n)}</b> al ${formatNumber(to)} piu vicino: ___`;
        const rounded = Math.round(n / to) * to;
        answer = formatNumber(rounded);
      } else {
        question = `Predecessore e successore: ___ , ${formatNumber(n)} , ___`;
        answer = `${n - 1}, ${n + 1}`;
      }
    } else {
      const n = randomInt(500000, 9999999);
      const positions = ['milioni', 'centinaia di migliaia', 'decine di migliaia', 'migliaia', 'centinaia', 'decine', 'unita'];
      const pos = randomChoice(positions);
      const posIndex = positions.indexOf(pos);
      const nStr = n.toString().padStart(7, '0');
      const digit = nStr[6 - posIndex] || '0';
      const value = parseInt(digit) * Math.pow(10, 6 - posIndex);
      if (type === 0) {
        question = `Qual e il valore delle <b>${pos}</b> in <b>${formatNumber(n)}</b>? ___`;
        answer = formatNumber(value);
      } else if (type === 1) {
        const to = randomChoice([1000, 10000, 100000]);
        question = `Arrotonda <b>${formatNumber(n)}</b> al ${formatNumber(to)} piu vicino: ___`;
        const rounded = Math.round(n / to) * to;
        answer = formatNumber(rounded);
      } else if (type === 2) {
        const item = randomChoice(wordNumbers);
        question = `Scrivi in cifre: <i>${item.word}</i> = ___`;
        answer = formatNumber(item.num);
      } else {
        const nums = [randomInt(1000000, 9999999), randomInt(1000000, 9999999), randomInt(1000000, 9999999)];
        question = `Ordina dal maggiore al minore: ${nums.map(x => formatNumber(x)).join(' - ')}`;
        const sorted = [...nums].sort((a, b) => b - a);
        answer = sorted.map(x => formatNumber(x)).join(' > ');
      }
    }
    exercises.push({ id: `numeri-${i}-${Date.now()}`, topicId: 'numeri', question, answer, difficulty: diff });
  }
  return exercises;
}

// ========== 2. ADDIZIONI E SOTTRAZIONI ==========
export function generateAddizioniExercises(diff, count) {
  const exercises = [];
  for (let i = 0; i < count; i++) {
    const type = randomInt(0, 2);
    let question, answer;
    if (diff === DIFFICULTY.LOW) {
      const a = randomInt(100, 999);
      const b = randomInt(100, 999);
      const op = randomChoice(['+', '-']);
      if (op === '+') {
        question = `Calcola: <b>${formatNumber(a)} + ${formatNumber(b)}</b> = ___`;
        answer = String(a + b);
      } else {
        const max = Math.max(a, b);
        const min = Math.min(a, b);
        question = `Calcola: <b>${formatNumber(max)} - ${formatNumber(min)}</b> = ___`;
        answer = String(max - min);
      }
    } else if (diff === DIFFICULTY.MID) {
      const a = randomInt(1000, 9999);
      const b = randomInt(1000, 9999);
      const op = randomChoice(['+', '-']);
      if (op === '+') {
        question = `Addizione: <b>${formatNumber(a)} + ${formatNumber(b)}</b> = ___`;
        answer = String(a + b);
      } else {
        const max = Math.max(a, b);
        const min = Math.min(a, b);
        question = `Sottrazione: <b>${formatNumber(max)} - ${formatNumber(min)}</b> = ___`;
        answer = String(max - min);
      }
    } else {
      const a = randomInt(10000, 99999);
      const b = randomInt(10000, 99999);
      const c = randomInt(1000, 9999);
      if (type === 0) {
        question = `Calcola: <b>${formatNumber(a)} + ${formatNumber(b)} + ${formatNumber(c)}</b> = ___`;
        answer = String(a + b + c);
      } else if (type === 1) {
        const max = Math.max(a, b);
        const min = Math.min(a, b);
        const result = max - min - c;
        question = `Calcola: <b>${formatNumber(max)} - ${formatNumber(min)} - ${formatNumber(c)}</b> = ___`;
        answer = String(result > 0 ? result : c - (max - min));
      } else {
        question = `Completa: <b>${formatNumber(a)} + ___ = ${formatNumber(a + b)}</b>`;
        answer = formatNumber(b);
      }
    }
    exercises.push({ id: `addizioni-${i}-${Date.now()}`, topicId: 'addizioni', question, answer, difficulty: diff });
  }
  return exercises;
}

// ========== 3. MOLTIPLICAZIONI ==========
export function generateMoltiplicazioniExercises(diff, count) {
  const exercises = [];
  for (let i = 0; i < count; i++) {
    const type = randomInt(0, 3);
    let question, answer;
    if (diff === DIFFICULTY.LOW) {
      const a = randomInt(2, 10);
      const b = randomInt(2, 10);
      if (type === 0) {
        question = `Calcola: <b>${a} x ${b}</b> = ___`;
        answer = String(a * b);
      } else if (type === 1) {
        question = `Completa: <b>${a} x ___ = ${a * b}</b>`;
        answer = String(b);
      } else if (type === 2) {
        question = `Completa: <b>___ x ${b} = ${a * b}</b>`;
        answer = String(a);
      } else {
        const c = randomInt(2, 5);
        question = `Calcola: <b>${a} x ${b} x ${c}</b> = ___`;
        answer = String(a * b * c);
      }
    } else if (diff === DIFFICULTY.MID) {
      const a = randomInt(10, 99);
      const b = randomInt(2, 9);
      if (type === 0) {
        question = `Moltiplicazione: <b>${formatNumber(a)} x ${b}</b> = ___`;
        answer = String(a * b);
      } else if (type === 1) {
        const result = a * b;
        question = `Completa: <b>${formatNumber(a)} x ___ = ${formatNumber(result)}</b>`;
        answer = String(b);
      } else if (type === 2) {
        const c = randomInt(10, 99);
        question = `Calcola: <b>${formatNumber(a)} x ${b} + ${formatNumber(c)}</b> = ___`;
        answer = String(a * b + c);
      } else {
        const c = randomInt(2, 9);
        question = `Calcola: <b>${formatNumber(a)} x ${b} x ${c}</b> = ___`;
        answer = String(a * b * c);
      }
    } else {
      const a = randomInt(100, 999);
      const b = randomInt(10, 99);
      if (type === 0) {
        question = `Moltiplicazione in colonna: <b>${formatNumber(a)} x ${formatNumber(b)}</b> = ___`;
        answer = String(a * b);
      } else if (type === 1) {
        const c = randomInt(10, 99);
        question = `Applica la proprieta distributiva: <b>${formatNumber(a)} x (${b} + ${c})</b> = ___`;
        answer = String(a * (b + c));
      } else if (type === 2) {
        const result = a * b;
        question = `Completa: <b>${formatNumber(a)} x ___ = ${formatNumber(result)}</b>`;
        answer = String(b);
      } else {
        const c = randomInt(10, 99);
        question = `Calcola: <b>${formatNumber(a)} x ${b} + ${formatNumber(a)} x ${c}</b> = ___`;
        answer = String(a * b + a * c);
      }
    }
    exercises.push({ id: `moltiplicazioni-${i}-${Date.now()}`, topicId: 'moltiplicazioni', question, answer, difficulty: diff });
  }
  return exercises;
}

// ========== 4. DIVISIONI ==========
export function generateDivisioniExercises(diff, count) {
  const exercises = [];
  for (let i = 0; i < count; i++) {
    const type = randomInt(0, 3);
    let question, answer;
    if (diff === DIFFICULTY.LOW) {
      const b = randomInt(2, 10);
      const result = randomInt(2, 10);
      const a = b * result;
      if (type === 0) {
        question = `Calcola: <b>${a} : ${b}</b> = ___`;
        answer = String(result);
      } else if (type === 1) {
        question = `Completa: <b>${a} : ___ = ${result}</b>`;
        answer = String(b);
      } else if (type === 2) {
        question = `Completa: <b>___ : ${b} = ${result}</b>`;
        answer = String(a);
      } else {
        const c = randomInt(2, 5);
        const total = a * c;
        question = `Calcola: <b>${total} : ${a}</b> = ___`;
        answer = String(c);
      }
    } else if (diff === DIFFICULTY.MID) {
      const b = randomInt(10, 20);
      const result = randomInt(10, 50);
      const a = b * result;
      if (type === 0) {
        question = `Divisione: <b>${formatNumber(a)} : ${b}</b> = ___`;
        answer = String(result);
      } else if (type === 1) {
        const remainder = randomInt(1, b - 1);
        const dividend = a + remainder;
        question = `Divisione con resto: <b>${formatNumber(dividend)} : ${b}</b> = ___ resto ___`;
        answer = `${result}, ${remainder}`;
      } else if (type === 2) {
        question = `Verifica: <b>${formatNumber(a)} : ${b} = ___</b>`;
        answer = String(result);
      } else {
        const c = randomInt(2, 5);
        question = `Calcola: <b>${formatNumber(a)} : ${b} : ${c}</b> = ___`;
        answer = String(Math.floor(a / b / c));
      }
    } else {
      const b = randomInt(20, 99);
      const result = randomInt(100, 999);
      const a = b * result;
      if (type === 0) {
        question = `Divisione in colonna: <b>${formatNumber(a)} : ${formatNumber(b)}</b> = ___`;
        answer = String(result);
      } else if (type === 1) {
        const remainder = randomInt(1, b - 1);
        const dividend = a + remainder;
        question = `Divisione con resto: <b>${formatNumber(dividend)} : ${formatNumber(b)}</b> = ___ resto ___`;
        answer = `${result}, ${remainder}`;
      } else if (type === 2) {
        const c = randomInt(10, 50);
        const dividend = b * c + randomInt(1, b - 1);
        question = `Calcola resto: <b>${formatNumber(dividend)} : ${formatNumber(b)}</b> resto = ___`;
        answer = String(dividend % b);
      } else {
        const c = randomInt(2, 9);
        const total = a * c + randomInt(0, b - 1);
        question = `Divisione approssimata: <b>${formatNumber(total)} : ${formatNumber(a)}</b> ≈ ___`;
        answer = String(c);
      }
    }
    exercises.push({ id: `divisioni-${i}-${Date.now()}`, topicId: 'divisioni', question, answer, difficulty: diff });
  }
  return exercises;
}

// ========== 5. FRAZIONI ==========
export function generateFrazioniExercises(diff, count) {
  const exercises = [];
  for (let i = 0; i < count; i++) {
    const type = randomInt(0, 3);
    let question, answer;
    if (diff === DIFFICULTY.LOW) {
      const denominator = randomInt(2, 10);
      const numerator = randomInt(1, denominator - 1);
      if (type === 0) {
        question = `Quale frazione rappresenta la parte colorata? <b>${numerator}/${denominator}</b> = ___`;
        answer = `${numerator}/${denominator}`;
      } else if (type === 1) {
        const whole = randomInt(2, 5);
        const num = randomInt(1, whole - 1);
        question = `Frazione propria di <b>${whole}</b>: ___`;
        answer = `${num}/${whole}`;
      } else if (type === 2) {
        question = `Frazione complementare a <b>${numerator}/${denominator}</b>: ___`;
        answer = `${denominator - numerator}/${denominator}`;
      } else {
        question = `Scrivi la frazione: <b>${numerator} parti su ${denominator}</b> = ___`;
        answer = `${numerator}/${denominator}`;
      }
    } else if (diff === DIFFICULTY.MID) {
      const denominator = randomInt(4, 12);
      const numerator = randomInt(1, denominator * 2);
      if (type === 0) {
        question = `Classifica la frazione <b>${numerator}/${denominator}</b>: (propria/impropria/apparente)`;
        if (numerator < denominator) answer = 'propria';
        else if (numerator === denominator) answer = 'apparente';
        else answer = 'impropria';
      } else if (type === 1) {
        const whole = denominator;
        const part = randomInt(1, denominator - 1);
        question = `Frazione impropria: <b>${whole + part}/${denominator}</b> = ___ + ___/${denominator}`;
        const mixed = Math.floor((whole + part) / denominator);
        const remainder = (whole + part) % denominator;
        answer = `${mixed}, ${remainder}`;
      } else if (type === 2) {
        const a = randomInt(1, denominator - 1);
        const b = denominator - a;
        question = `Frazioni complementari: <b>${a}/${denominator}</b> + ___ = 1`;
        answer = `${b}/${denominator}`;
      } else {
        const num1 = randomInt(1, denominator - 1);
        const num2 = randomInt(1, denominator - 1);
        question = `Confronta: <b>${num1}/${denominator}</b> ⬜ <b>${num2}/${denominator}</b> (&lt; &gt; =)`;
        answer = num1 > num2 ? '>' : num1 < num2 ? '<' : '=';
      }
    } else {
      const denominator = randomInt(6, 15);
      if (type === 0) {
        const num1 = randomInt(1, denominator - 1);
        const num2 = randomInt(1, denominator - 1);
        question = `Addizione di frazioni: <b>${num1}/${denominator} + ${num2}/${denominator}</b> = ___`;
        answer = `${num1 + num2}/${denominator}`;
      } else if (type === 1) {
        const whole = randomInt(2, 10);
        const improperNumerator = whole * denominator + randomInt(1, denominator - 1);
        question = `Da impropria a mista: <b>${improperNumerator}/${denominator}</b> = ___ ___/${denominator}`;
        const mixed = Math.floor(improperNumerator / denominator);
        const remainder = improperNumerator % denominator;
        answer = `${mixed}, ${remainder}`;
      } else if (type === 2) {
        const num1 = randomInt(1, denominator * 2);
        const num2 = randomInt(1, denominator * 2);
        question = `Sottrazione di frazioni: <b>${num1}/${denominator} - ${num2}/${denominator}</b> = ___`;
        const resultNum = num1 - num2;
        answer = resultNum > 0 ? `${resultNum}/${denominator}` : `${Math.abs(resultNum)}/${denominator} (negativo)`;
      } else {
        const fraction = randomChoice([
          { num: 2, den: 4, simplified: '1/2' },
          { num: 3, den: 6, simplified: '1/2' },
          { num: 4, den: 8, simplified: '1/2' },
          { num: 2, den: 8, simplified: '1/4' },
          { num: 3, den: 9, simplified: '1/3' }
        ]);
        question = `Semplifica: <b>${fraction.num}/${fraction.den}</b> = ___`;
        answer = fraction.simplified;
      }
    }
    exercises.push({ id: `frazioni-${i}-${Date.now()}`, topicId: 'frazioni', question, answer, difficulty: diff });
  }
  return exercises;
}

// ========== 6. DECIMALI ==========
export function generateDecimaliExercises(diff, count) {
  const exercises = [];
  for (let i = 0; i < count; i++) {
    const type = randomInt(0, 3);
    let question, answer;
    if (diff === DIFFICULTY.LOW) {
      const whole = randomInt(1, 9);
      const decimal = randomInt(1, 9);
      const num = parseFloat(`${whole}.${decimal}`);
      if (type === 0) {
        question = `Scrivi in cifre: <b>${whole} e ${decimal} decimi</b> = ___`;
        answer = num.toFixed(1);
      } else if (type === 1) {
        const num2 = parseFloat(`${randomInt(1, 9)}.${randomInt(1, 9)}`);
        question = `Confronta: <b>${num.toFixed(1)}</b> ⬜ <b>${num2.toFixed(1)}</b> (&lt; &gt; =)`;
        answer = num > num2 ? '>' : num < num2 ? '<' : '=';
      } else if (type === 2) {
        const a = parseFloat(`${randomInt(1, 4)}.${randomInt(1, 5)}`);
        const b = parseFloat(`${randomInt(1, 4)}.${randomInt(1, 5)}`);
        question = `Addizione: <b>${a.toFixed(1)} + ${b.toFixed(1)}</b> = ___`;
        answer = (a + b).toFixed(1);
      } else {
        const a = parseFloat(`${randomInt(5, 9)}.${randomInt(5, 9)}`);
        const b = parseFloat(`${randomInt(1, 4)}.${randomInt(1, 4)}`);
        question = `Sottrazione: <b>${a.toFixed(1)} - ${b.toFixed(1)}</b> = ___`;
        answer = (a - b).toFixed(1);
      }
    } else if (diff === DIFFICULTY.MID) {
      const whole = randomInt(10, 99);
      const decimal = randomInt(10, 99);
      const num = parseFloat(`${whole}.${decimal}`);
      if (type === 0) {
        question = `Scomponi: <b>${num.toFixed(2)}</b> = ___ + ___/100`;
        answer = `${whole}, ${decimal}`;
      } else if (type === 1) {
        const a = parseFloat(`${randomInt(10, 50)}.${randomInt(10, 99)}`);
        const b = parseFloat(`${randomInt(10, 50)}.${randomInt(10, 99)}`);
        question = `Addizione: <b>${a.toFixed(2)} + ${b.toFixed(2)}</b> = ___`;
        answer = (a + b).toFixed(2);
      } else if (type === 2) {
        const a = parseFloat(`${randomInt(20, 99)}.${randomInt(10, 99)}`);
        const b = parseFloat(`${randomInt(10, 20)}.${randomInt(10, 50)}`);
        question = `Sottrazione: <b>${a.toFixed(2)} - ${b.toFixed(2)}</b> = ___`;
        answer = (a - b).toFixed(2);
      } else {
        const numbers = [
          parseFloat(`${randomInt(10, 99)}.${randomInt(10, 99)}`),
          parseFloat(`${randomInt(10, 99)}.${randomInt(10, 99)}`),
          parseFloat(`${randomInt(10, 99)}.${randomInt(10, 99)}`)
        ];
        question = `Ordina: ${numbers.map(n => n.toFixed(2)).join(' - ')}`;
        const sorted = [...numbers].sort((a, b) => a - b);
        answer = sorted.map(n => n.toFixed(2)).join(' < ');
      }
    } else {
      const a = parseFloat(`${randomInt(100, 999)}.${randomInt(10, 99)}`);
      const b = parseFloat(`${randomInt(10, 99)}.${randomInt(10, 99)}`);
      if (type === 0) {
        question = `Addizione complessa: <b>${a.toFixed(2)} + ${b.toFixed(2)}</b> = ___`;
        answer = (a + b).toFixed(2);
      } else if (type === 1) {
        question = `Sottrazione complessa: <b>${a.toFixed(2)} - ${b.toFixed(2)}</b> = ___`;
        answer = (a - b).toFixed(2);
      } else if (type === 2) {
        const c = parseFloat(`${randomInt(10, 50)}.${randomInt(10, 99)}`);
        question = `Catena: <b>${a.toFixed(2)} + ${b.toFixed(2)} - ${c.toFixed(2)}</b> = ___`;
        answer = (a + b - c).toFixed(2);
      } else {
        const num = parseFloat(`${randomInt(100, 999)}.${randomInt(10, 99)}`);
        const multiplyBy = randomInt(2, 10);
        question = `Moltiplicazione: <b>${num.toFixed(2)} x ${multiplyBy}</b> = ___`;
        answer = (num * multiplyBy).toFixed(2);
      }
    }
    exercises.push({ id: `decimali-${i}-${Date.now()}`, topicId: 'decimali', question, answer, difficulty: diff });
  }
  return exercises;
}

// ========== 7. GEOMETRIA ==========
export function generateGeometriaExercises(diff, count) {
  const exercises = [];
  for (let i = 0; i < count; i++) {
    const type = randomInt(0, 3);
    let question, answer;
    if (diff === DIFFICULTY.LOW) {
      const side = randomInt(2, 10);
      if (type === 0) {
        question = `Perimetro quadrato lato <b>${side} cm</b>: ___ cm`;
        answer = String(side * 4);
      } else if (type === 1) {
        question = `Area quadrato lato <b>${side} cm</b>: ___ cm²`;
        answer = String(side * side);
      } else if (type === 2) {
        const width = randomInt(2, 8);
        const height = randomInt(2, 8);
        question = `Perimetro rettangolo <b>${width} cm x ${height} cm</b>: ___ cm`;
        answer = String((width + height) * 2);
      } else {
        const width = randomInt(2, side);
        question = `Area rettangolo <b>${side} cm x ${width} cm</b>: ___ cm²`;
        answer = String(side * width);
      }
    } else if (diff === DIFFICULTY.MID) {
      const side = randomInt(5, 20);
      if (type === 0) {
        question = `Perimetro quadrato lato <b>${side} cm</b>: ___ cm`;
        answer = String(side * 4);
      } else if (type === 1) {
        question = `Area quadrato lato <b>${side} cm</b>: ___ cm²`;
        answer = String(side * side);
      } else if (type === 2) {
        const width = randomInt(5, 15);
        const height = randomInt(5, 15);
        question = `Area rettangolo <b>${width} cm x ${height} cm</b>: ___ cm²`;
        answer = String(width * height);
      } else {
        const a = randomInt(5, 10);
        const b = randomInt(5, 10);
        const c = randomInt(5, 10);
        question = `Perimetro triangolo <b>${a} cm, ${b} cm, ${c} cm</b>: ___ cm`;
        answer = String(a + b + c);
      }
    } else {
      if (type === 0) {
        const side = randomInt(10, 30);
        question = `Perimetro e area quadrato lato <b>${side} m</b>: P = ___ m, A = ___ m²`;
        answer = `${side * 4}, ${side * side}`;
      } else if (type === 1) {
        const width = randomInt(10, 25);
        const height = randomInt(10, 25);
        question = `Perimetro e area rettangolo <b>${width} m x ${height} m</b>: P = ___ m, A = ___ m²`;
        answer = `${(width + height) * 2}, ${width * height}`;
      } else if (type === 2) {
        const a = randomInt(10, 20);
        const b = randomInt(10, 20);
        question = `Area triangolo rettangolo cateti <b>${a} cm, ${b} cm</b>: ___ cm²`;
        answer = String(Math.floor(a * b / 2));
      } else {
        const base = randomInt(10, 25);
        const height = randomInt(5, 15);
        question = `Area triangolo base <b>${base} cm</b>, altezza <b>${height} cm</b>: ___ cm²`;
        answer = String(Math.floor(base * height / 2));
      }
    }
    exercises.push({ id: `geometria-${i}-${Date.now()}`, topicId: 'geometria', question, answer, difficulty: diff });
  }
  return exercises;
}

// ========== 8. MISURE ==========
export function generateMisureExercises(diff, count) {
  const exercises = [];
  const units = ['m', 'dm', 'cm', 'mm'];
  const unitLabels = ['metro', 'decimetro', 'centimetro', 'millimetro'];
  const weights = ['kg', 'hg', 'dag', 'g'];
  const weightLabels = ['chilogrammo', 'ettogrammo', 'decagrammo', 'grammo'];
  const capacities = ['l', 'dl', 'cl', 'ml'];
  const capacityLabels = ['litro', 'decilitro', 'centilitro', 'millilitro'];

  for (let i = 0; i < count; i++) {
    const type = randomInt(0, 3);
    let question, answer;
    if (diff === DIFFICULTY.LOW) {
      if (type === 0) {
        const fromIdx = randomInt(0, 2);
        const toIdx = randomInt(fromIdx + 1, 3);
        const value = randomInt(1, 10) * Math.pow(10, toIdx - fromIdx);
        question = `Converti <b>${value} ${units[fromIdx]}</b> in ${unitLabels[toIdx]}: ___`;
        answer = String(value * Math.pow(10, toIdx - fromIdx));
      } else if (type === 1) {
        const fromIdx = randomInt(0, 2);
        const toIdx = randomInt(fromIdx + 1, 3);
        const value = randomInt(1, 10);
        question = `Converti <b>${value} ${weights[fromIdx]}</b> in ${weightLabels[toIdx]}: ___`;
        answer = String(value * Math.pow(10, toIdx - fromIdx));
      } else if (type === 2) {
        const fromIdx = randomInt(0, 2);
        const toIdx = randomInt(fromIdx + 1, 3);
        const value = randomInt(1, 10);
        question = `Converti <b>${value} ${capacities[fromIdx]}</b> in ${capacityLabels[toIdx]}: ___`;
        answer = String(value * Math.pow(10, toIdx - fromIdx));
      } else {
        const hours = randomInt(1, 5);
        const minutes = randomInt(0, 59);
        question = `Converti <b>${hours} h ${minutes} min</b> in minuti: ___`;
        answer = String(hours * 60 + minutes);
      }
    } else if (diff === DIFFICULTY.MID) {
      if (type === 0) {
        const value = randomInt(10, 100);
        const fromIdx = randomInt(0, 2);
        const toIdx = randomInt(fromIdx + 1, 3);
        question = `Converti <b>${value} ${units[fromIdx]}</b> in ${unitLabels[toIdx]}: ___`;
        answer = String(value * Math.pow(10, toIdx - fromIdx));
      } else if (type === 1) {
        const value = randomInt(100, 1000);
        const fromIdx = randomInt(1, 2);
        const toIdx = randomInt(0, fromIdx - 1);
        question = `Converti <b>${value} ${units[fromIdx]}</b> in ${unitLabels[toIdx]}: ___`;
        answer = String(value / Math.pow(10, fromIdx - toIdx));
      } else if (type === 2) {
        const value = randomInt(100, 500);
        const fromIdx = randomInt(1, 2);
        const toIdx = randomInt(0, fromIdx - 1);
        question = `Converti <b>${value} ${capacities[fromIdx]}</b> in ${capacityLabels[toIdx]}: ___`;
        answer = String(value / Math.pow(10, fromIdx - toIdx));
      } else {
        const minutes = randomInt(60, 300);
        question = `Converti <b>${minutes} minuti</b> in ore e minuti: ___ h ___ min`;
        const hours = Math.floor(minutes / 60);
        const remaining = minutes % 60;
        answer = `${hours}, ${remaining}`;
      }
    } else {
      if (type === 0) {
        const value = randomInt(1, 5);
        const unit = randomChoice(['km', 'hm', 'dam']);
        let multiplier = 1;
        if (unit === 'km') multiplier = 1000;
        else if (unit === 'hm') multiplier = 100;
        else if (unit === 'dam') multiplier = 10;
        question = `Converti <b>${value} ${unit}</b> in metri: ___ m`;
        answer = String(value * multiplier);
      } else if (type === 1) {
        const meters = randomInt(1000, 5000);
        question = `Converti <b>${meters} m</b> in km e m: ___ km ___ m`;
        const km = Math.floor(meters / 1000);
        const m = meters % 1000;
        answer = `${km}, ${m}`;
      } else if (type === 2) {
        const grams = randomInt(2000, 10000);
        question = `Converti <b>${grams} g</b> in kg e g: ___ kg ___ g`;
        const kg = Math.floor(grams / 1000);
        const g = grams % 1000;
        answer = `${kg}, ${g}`;
      } else {
        const seconds = randomInt(3600, 10800);
        question = `Converti <b>${seconds} secondi</b> in ore, minuti e secondi: ___ h ___ min ___ s`;
        const hours = Math.floor(seconds / 3600);
        const remainingSeconds = seconds % 3600;
        const mins = Math.floor(remainingSeconds / 60);
        const secs = remainingSeconds % 60;
        answer = `${hours}, ${mins}, ${secs}`;
      }
    }
    exercises.push({ id: `misure-${i}-${Date.now()}`, topicId: 'misure', question, answer, difficulty: diff });
  }
  return exercises;
}

// ========== 9. PROBLEMI ==========
export function generateProblemiExercises(diff, count) {
  const exercises = [];
  for (let i = 0; i < count; i++) {
    const type = randomInt(0, 3);
    let question, answer;
    if (diff === DIFFICULTY.LOW) {
      if (type === 0) {
        const price = randomInt(2, 10);
        const quantity = randomInt(2, 8);
        question = `Marco compra ${quantity} quaderni a €${price} cadauno. Quanto spende in totale?`;
        answer = String(price * quantity);
      } else if (type === 1) {
        const total = randomInt(20, 50);
        const parts = randomInt(2, 5);
        const each = Math.floor(total / parts);
        question = `Dividi €${total} tra ${parts} amici. Quanto riceve ognuno?`;
        answer = String(each);
      } else if (type === 2) {
        const a = randomInt(10, 30);
        const b = randomInt(5, 15);
        question = `In un bus ci sono ${a} passeggeri. Ne scendono ${b}. Quanti rimangono?`;
        answer = String(a - b);
      } else {
        const a = randomInt(5, 15);
        const b = randomInt(5, 15);
        question = `Luca ha ${a} caramelle, Marco ne ha ${b}. Quante caramelle hanno insieme?`;
        answer = String(a + b);
      }
    } else if (diff === DIFFICULTY.MID) {
      if (type === 0) {
        const length = randomInt(10, 50);
        const width = randomInt(5, 20);
        question = `Un rettangolo ha lunghezza ${length} cm e larghezza ${width} cm. Qual e il perimetro?`;
        answer = String((length + width) * 2);
      } else if (type === 1) {
        const total = randomInt(100, 500);
        const spent = randomInt(50, 200);
        question = `Giulia ha €${total}. Ne spende €${spent}. Quanto le rimane?`;
        answer = String(total - spent);
      } else if (type === 2) {
        const a = randomInt(10, 40);
        const b = randomInt(2, 8);
        question = `In una scatola ci sono ${a} matite. Se ne prendi ${b} al giorno, dopo quanti giorni finiscono?`;
        answer = String(Math.floor(a / b));
      } else {
        const price1 = randomInt(5, 20);
        const price2 = randomInt(5, 20);
        const quantity1 = randomInt(2, 6);
        const quantity2 = randomInt(2, 6);
        question = `Compro ${quantity1} libretti a €${price1} e ${quantity2} penne a €${price2}. Quanto spendo in totale?`;
        answer = String(price1 * quantity1 + price2 * quantity2);
      }
    } else {
      if (type === 0) {
        const side = randomInt(10, 30);
        question = `Un quadrato ha lato ${side} m. Qual e l'area in metri quadrati?`;
        answer = String(side * side);
      } else if (type === 1) {
        const total = randomInt(500, 1000);
        const part1 = randomInt(100, 300);
        const part2 = randomInt(100, 300);
        question = `Una merce costa €${total}. Pago €${part1} in contanti e €${part2} con carta. Quanto manca?`;
        answer = String(total - part1 - part2);
      } else if (type === 2) {
        const length = randomInt(100, 500);
        const time = randomInt(2, 10);
        question = `Un treno viaggia a ${length / time} km/h per ${time} ore. Quantil kilometri percorsi?`;
        answer = String(length);
      } else {
        const a = randomInt(100, 300);
        const b = randomInt(20, 80);
        const c = randomInt(5, 20);
        question = `In un neggozio ci sono ${a} prodotti. Se ne vendono ${b} al mattino e ${c} al pomeriggio, quanti ne rimangono?`;
        answer = String(a - b - c);
      }
    }
    exercises.push({ id: `problemi-${i}-${Date.now()}`, topicId: 'problemi', question, answer, difficulty: diff });
  }
  return exercises;
}

// ========== 10. PROPRIETA ==========
export function generateProprietaExercises(diff, count) {
  const exercises = [];
  for (let i = 0; i < count; i++) {
    const type = randomInt(0, 3);
    let question, answer;
    if (diff === DIFFICULTY.LOW) {
      const a = randomInt(2, 8);
      const b = randomInt(2, 8);
      if (type === 0) {
        question = `Proprieta commutativa: <b>${a} + ${b} = ___ + ${a}</b>`;
        answer = String(b);
      } else if (type === 1) {
        question = `Proprieta commutativa: <b>${a} x ${b} = ${b} x ___</b>`;
        answer = String(a);
      } else if (type === 2) {
        question = `Calcola usando la commutativa: <b>${a} + ${b} + ${a}</b> = ___`;
        answer = String(a * 2 + b);
      } else {
        question = `Calcola usando la commutativa: <b>${a} x ${b} x 1</b> = ___`;
        answer = String(a * b);
      }
    } else if (diff === DIFFICULTY.MID) {
      const a = randomInt(5, 12);
      const b = randomInt(2, 8);
      const c = randomInt(2, 8);
      if (type === 0) {
        question = `Proprieta associativa: <b>(${a} + ${b}) + ${c} = ${a} + (___ + ${c})</b>`;
        answer = String(b);
      } else if (type === 1) {
        question = `Proprieta associativa: <b>(${a} x ${b}) x ${c} = ${a} x (___ x ${c})</b>`;
        answer = String(b);
      } else if (type === 2) {
        question = `Calcola con associativa: <b>${a} + ${b} + ${c}</b> = ___`;
        answer = String(a + b + c);
      } else {
        question = `Applica la distributiva: <b>${a} x (${b} + ${c})</b> = ___`;
        answer = String(a * (b + c));
      }
    } else {
      const a = randomInt(10, 20);
      const b = randomInt(2, 10);
      const c = randomInt(2, 10);
      if (type === 0) {
        question = `Proprieta distributiva: <b>${a} x (${b} + ${c}) = ${a} x ___ + ${a} x ${c}</b>`;
        answer = String(b);
      } else if (type === 1) {
        question = `Calcola con distributiva: <b>${a} x ${b} + ${a} x ${c}</b> = ___`;
        answer = String(a * (b + c));
      } else if (type === 2) {
        const d = randomInt(2, 5);
        question = `Applica distributiva inversa: <b>${a} x ${b} + ${a} x ${d}</b> = ___ x ___`;
        answer = `${a}, ${b + d}`;
      } else {
        question = `Calcola: <b>${a} x (${b} + ${c}) - ${a} x ${c}</b> = ___`;
        answer = String(a * b);
      }
    }
    exercises.push({ id: `proprieta-${i}-${Date.now()}`, topicId: 'proprieta', question, answer, difficulty: diff });
  }
  return exercises;
}

// ========== 11. LOGICA ==========
export function generateLogicaExercises(diff, count) {
  const exercises = [];
  for (let i = 0; i < count; i++) {
    const type = randomInt(0, 3);
    let question, answer;
    if (diff === DIFFICULTY.LOW) {
      if (type === 0) {
        const start = randomInt(10, 30);
        const step = randomInt(2, 5);
        const sequence = Array.from({ length: 4 }, (_, j) => start + j * step);
        const missingIndex = randomInt(0, 3);
        const displaySequence = sequence.map((n, idx) => idx === missingIndex ? '___' : n);
        const missingValue = sequence[missingIndex];
        question = `Completa la serie: ${displaySequence.join(' - ')}`;
        answer = String(missingValue);
      } else if (type === 1) {
        const num = randomInt(10, 50);
        const divisors = Array.from({ length: num }, (_, j) => j + 1).filter(d => num % d === 0);
        question = `Divisori di <b>${num}</b>: scrivine almeno 3`;
        answer = divisors.slice(0, 3).join(', ');
      } else if (type === 2) {
        const num1 = randomInt(10, 30);
        const num2 = randomInt(10, 30);
        const result = gcd(num1, num2);
        question = `MCD tra <b>${num1}</b> e <b>${num2}</b>: ___`;
        answer = String(result);
      } else {
        const num = randomInt(2, 20);
        const isPrime = (n) => {
          if (n < 2) return false;
          for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
          return true;
        };
        question = `Il numero <b>${num}</b> e primo? (si/no)`;
        answer = isPrime(num) ? 'si' : 'no';
      }
    } else if (diff === DIFFICULTY.MID) {
      if (type === 0) {
        const start = randomInt(5, 20);
        const step = randomInt(3, 8);
        const sequence = Array.from({ length: 5 }, (_, j) => start + j * step);
        const missingIndex = randomInt(0, 4);
        const displaySequence = sequence.map((n, idx) => idx === missingIndex ? '___' : n);
        const missingValue = sequence[missingIndex];
        question = `Completa la serie: ${displaySequence.join(' - ')}`;
        answer = String(missingValue);
      } else if (type === 1) {
        const num = randomInt(30, 80);
        const primeFactors = [];
        let temp = num;
        for (let j = 2; j <= temp; j++) {
          while (temp % j === 0) {
            primeFactors.push(j);
            temp /= j;
          }
        }
        question = `Scomponi in fattori primi <b>${num}</b>: ___`;
        answer = primeFactors.join(' x ');
      } else if (type === 2) {
        const num1 = randomInt(20, 60);
        const num2 = randomInt(20, 60);
        const lcm = (a, b) => a * b / gcd(a, b);
        question = `mcm tra <b>${num1}</b> e <b>${num2}</b>: ___`;
        answer = String(lcm(num1, num2));
      } else {
        const numbers = Array.from({ length: 5 }, () => randomInt(10, 50));
        const targetSum = numbers.reduce((sum, n) => sum + n, 0) - randomChoice(numbers);
        question = `Quale numero manca? ${numbers.slice(0, 4).join(' + ')} + ___ = ${targetSum + randomChoice(numbers)}`;
        answer = String(targetSum);
      }
    } else {
      if (type === 0) {
        const start = randomInt(10, 50);
        const step1 = randomInt(2, 6);
        const step2 = randomInt(2, 6);
        const sequence = [start, start + step1, start + step1 + step2];
        const next1 = sequence[2] + step1 + step2;
        const next2 = next1 + step1 + step2;
        question = `Continua la serie: ${sequence.join(' - ')} - ___ - ___`;
        answer = `${next1}, ${next2}`;
      } else if (type === 1) {
        const num = randomInt(100, 200);
        const divisors = Array.from({ length: num }, (_, j) => j + 1).filter(d => num % d === 0);
        question = `Trova tutti i divisori di <b>${num}</b>: ___`;
        answer = divisors.join(', ');
      } else if (type === 2) {
        const num1 = randomInt(50, 100);
        const num2 = randomInt(50, 100);
        const lcm = (a, b) => a * b / gcd(a, b);
        question = `Calcola MCD e mcm tra <b>${num1}</b> e <b>${num2}</b>: MCD = ___ , mcm = ___`;
        answer = `${gcd(num1, num2)}, ${lcm(num1, num2)}`;
      } else {
        const numbers = Array.from({ length: 6 }, () => randomInt(10, 100));
        const sum = numbers.reduce((a, b) => a + b, 0);
        const average = (sum / numbers.length).toFixed(1);
        question = `Media aritmetica di: ${numbers.join(' - ')} = ___`;
        answer = average;
      }
    }
    exercises.push({ id: `logica-${i}-${Date.now()}`, topicId: 'logica', question, answer, difficulty: diff });
  }
  return exercises;
}

// ========== 12. DATI ==========
export function generateDatiExercises(diff, count) {
  const exercises = [];
  for (let i = 0; i < count; i++) {
    const type = randomInt(0, 3);
    let question, answer;
    if (diff === DIFFICULTY.LOW) {
      if (type === 0) {
        const values = Array.from({ length: 5 }, () => randomInt(1, 10));
        const freqValue = randomChoice(values);
        const frequency = values.filter(v => v === freqValue).length;
        question = `Qual e la frequenza di <b>${freqValue}</b> in: ${values.join(' - ')}? ___`;
        answer = String(frequency);
      } else if (type === 1) {
        const values = Array.from({ length: 6 }, () => randomInt(1, 15));
        const sum = values.reduce((a, b) => a + b, 0);
        question = `Calcola la somma: ${values.join(' + ')} = ___`;
        answer = String(sum);
      } else if (type === 2) {
        const values = Array.from({ length: 5 }, () => randomInt(1, 10));
        const sorted = [...values].sort((a, b) => a - b);
        const mode = sorted.find((v, i, arr) => {
          const count = arr.filter(x => x === v).length;
          return count >= 2 && (i === 0 || arr.filter(x => x === arr[i - 1]).length < count);
        }) || randomChoice(values);
        question = `Qual e la moda in: ${values.join(' - ')}? ___`;
        answer = String(mode);
      } else {
        const values = Array.from({ length: 5 }, () => randomInt(1, 10));
        const sorted = [...values].sort((a, b) => a - b);
        const median = sorted.length % 2 === 0 
          ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2 
          : sorted[Math.floor(sorted.length / 2)];
        question = `Qual e la mediana in: ${values.join(' - ')}? ___`;
        answer = String(median);
      }
    } else if (diff === DIFFICULTY.MID) {
      if (type === 0) {
        const values = Array.from({ length: 8 }, () => randomInt(5, 20));
        const sum = values.reduce((a, b) => a + b, 0);
        const average = sum / values.length;
        question = `Calcola la media: ${values.join(' - ')} = ___`;
        answer = average.toFixed(1);
      } else if (type === 1) {
        const values = Array.from({ length: 7 }, () => randomInt(1, 20));
        const frequencies = {};
        values.forEach(v => frequencies[v] = (frequencies[v] || 0) + 1);
        const maxFreq = Math.max(...Object.values(frequencies));
        const modes = Object.keys(frequencies).filter(k => frequencies[k] === maxFreq);
        question = `Quali sono le mode in: ${values.join(' - ')}? ___`;
        answer = modes.join(', ');
      } else if (type === 2) {
        const values = Array.from({ length: 8 }, () => randomInt(5, 25));
        const sorted = [...values].sort((a, b) => a - b);
        const median = sorted.length % 2 === 0 
          ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2 
          : sorted[Math.floor(sorted.length / 2)];
        question = `Calcola la mediana: ${values.join(' - ')} = ___`;
        answer = median.toFixed(1);
      } else {
        const total = randomInt(50, 100);
        const favorable = randomInt(10, 30);
        const probability = (favorable / total).toFixed(2);
        question = `Probabilita: <b>${favorable}</b> casi favorevoli su <b>${total}</b> totali: ___`;
        answer = probability;
      }
    } else {
      if (type === 0) {
        const values = Array.from({ length: 10 }, () => randomInt(10, 50));
        const sum = values.reduce((a, b) => a + b, 0);
        const average = sum / values.length;
        const variance = values.reduce((acc, val) => acc + Math.pow(val - average, 2), 0) / values.length;
        question = `Calcola media e varianza: ${values.slice(0, 5).join(' - ')}... = media: ___ , varianza: ___`;
        answer = `${average.toFixed(1)}, ${variance.toFixed(1)}`;
      } else if (type === 1) {
        const values1 = Array.from({ length: 6 }, () => randomInt(10, 30));
        const values2 = Array.from({ length: 6 }, () => randomInt(10, 30));
        const avg1 = values1.reduce((a, b) => a + b, 0) / values1.length;
        const avg2 = values2.reduce((a, b) => a + b, 0) / values2.length;
        question = `Confronta le medie: Gruppo A: ${values1.join(' - ')} | Gruppo B: ${values2.join(' - ')}. Media A = ___ , Media B = ___`;
        answer = `${avg1.toFixed(1)}, ${avg2.toFixed(1)}`;
      } else if (type === 2) {
        const total = randomInt(200, 500);
        const favorable = randomInt(50, 150);
        const probability = (favorable / total).toFixed(2);
        const percentage = ((favorable / total) * 100).toFixed(1);
        question = `In una lotteria ci sono <b>${favorable}</b> biglietti vincenti su <b>${total}</b>. Probabilita di vincere: ___ (% ___)`;
        answer = `${probability}, ${percentage}`;
      } else {
        const data = Array.from({ length: 8 }, () => randomInt(15, 40));
        const sorted = [...data].sort((a, b) => a - b);
        const q1 = sorted[Math.floor(sorted.length * 0.25)];
        const q3 = sorted[Math.floor(sorted.length * 0.75)];
        question = `Calcola Q1 e Q3: ${sorted.join(' - ')}. Q1 = ___ , Q3 = ___`;
        answer = `${q1}, ${q3}`;
      }
    }
    exercises.push({ id: `dati-${i}-${Date.now()}`, topicId: 'dati', question, answer, difficulty: diff });
  }
  return exercises;
}

// Esporta tutti i generatori in un oggetto per accesso dinamico
export const EXERCISE_GENERATORS = {
  numeri: generateNumeriExercises,
  addizioni: generateAddizioniExercises,
  moltiplicazioni: generateMoltiplicazioniExercises,
  divisioni: generateDivisioniExercises,
  frazioni: generateFrazioniExercises,
  decimali: generateDecimaliExercises,
  geometria: generateGeometriaExercises,
  misure: generateMisureExercises,
  problemi: generateProblemiExercises,
  proprieta: generateProprietaExercises,
  logica: generateLogicaExercises,
  dati: generateDatiExercises
};

// Funzione per generare esercizi per un argomento specifico
export function generateTopicExercises(topicId, diff, count) {
  const generator = EXERCISE_GENERATORS[topicId];
  if (generator) {
    return generator(diff, count);
  }
  console.warn(`Nessun generatore trovato per l'argomento: ${topicId}`);
  return [];
}