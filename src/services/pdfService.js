/**
 * Servizio di esportazione PDF
 * Genera un PDF stampabile della scheda di esercizi corrente usando jsPDF
 */

import { jsPDF } from 'jspdf';
import { getAnyTopicById } from '../data/curriculum/index.js';

const PAGE_WIDTH = 595.28; // A4 in pt
const PAGE_HEIGHT = 841.89;
const MARGIN = 50;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const PRIMARY_COLOR = [0, 77, 91]; // #004d5b

/**
 * Converte l'HTML semplice usato nelle domande (br, pre) in testo semplice
 * mantenendo gli a-capo per gli esercizi di calcolo in colonna
 *
 * @param {string} html
 * @returns {string}
 */
function stripHtml(html) {
  if (!html) return '';
  return String(html)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?pre>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Genera il documento jsPDF della scheda esercizi corrente
 *
 * @param {Object} params
 * @param {Object} params.studentData - { name, date, grade }
 * @param {string} params.gradeLabel - Etichetta del grado (es. "Classe Quinta Primaria")
 * @param {Array<string>} params.selectedTopicIds - ID argomenti selezionati, in ordine
 * @param {Object} params.exercises - Mappa topicId -> array di esercizi
 * @param {Object} [params.studentAnswers] - Mappa exerciseId -> risposta inserita
 * @returns {jsPDF} Documento jsPDF pronto per essere salvato o aperto
 */
export function generateWorksheetPdf({ studentData, gradeLabel, selectedTopicIds, exercises, studentAnswers = {} }) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  let y = MARGIN;

  const ensureSpace = (needed) => {
    if (y + needed > PAGE_HEIGHT - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  // Titolo
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('Scheda Esercitazioni di Matematica', MARGIN, y);
  y += 22;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(90, 90, 90);
  doc.text(gradeLabel || '', MARGIN, y);
  y += 20;

  // Riga divisoria
  doc.setDrawColor(200, 200, 200);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 20;

  // Dati studente
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(`Studente: ${studentData?.name?.trim() || '_______________________'}`, MARGIN, y);
  doc.text(`Data: ${studentData?.date || ''}`, PAGE_WIDTH - MARGIN - 150, y);
  y += 16;
  if (studentData?.grade?.trim()) {
    doc.text(`Valutazione: ${studentData.grade}`, MARGIN, y);
    y += 16;
  }
  y += 12;

  // Sezioni per argomento
  selectedTopicIds.forEach((topicId) => {
    const topic = getAnyTopicById(topicId);
    const topicExercises = exercises[topicId] || [];
    if (topicExercises.length === 0) return;

    ensureSpace(46);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...PRIMARY_COLOR);
    doc.text(topic?.name || topicId, MARGIN, y);
    y += 10;
    doc.setDrawColor(...PRIMARY_COLOR);
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
    y += 18;

    topicExercises.forEach((exercise, index) => {
      const questionText = stripHtml(exercise.question);
      const lines = doc.splitTextToSize(`${index + 1}. ${questionText}`, CONTENT_WIDTH - 12);
      const lineHeight = 13;

      const hasOptions = Array.isArray(exercise.options) && exercise.options.length > 0;
      const answerBlockHeight = hasOptions ? exercise.options.length * 13 + 10 : 24;
      const blockHeight = lines.length * lineHeight + 8 + answerBlockHeight;

      ensureSpace(blockHeight);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(30, 30, 30);
      lines.forEach((line) => {
        doc.text(line, MARGIN + 12, y);
        y += lineHeight;
      });
      y += 4;

      if (hasOptions) {
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        exercise.options.forEach((opt, optIndex) => {
          const letter = String.fromCharCode(65 + optIndex);
          doc.text(`${letter}) ${opt.label}`, MARGIN + 24, y);
          y += 13;
        });
        y += 8;
      } else {
        const userAnswer = studentAnswers[exercise.id];
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text('Risposta:', MARGIN + 12, y);
        if (userAnswer && userAnswer.trim()) {
          doc.setTextColor(...PRIMARY_COLOR);
          doc.text(userAnswer, MARGIN + 70, y);
        } else {
          doc.setDrawColor(150, 150, 150);
          doc.line(MARGIN + 70, y + 2, PAGE_WIDTH - MARGIN, y + 2);
        }
        y += 22;
      }
    });

    y += 14;
  });

  return doc;
}

/**
 * Genera e avvia il download del PDF della scheda corrente
 *
 * @param {Object} params - Vedi generateWorksheetPdf
 * @param {string} [filename] - Nome del file da scaricare
 */
export function downloadWorksheetPdf(params, filename = 'scheda-matematica.pdf') {
  const doc = generateWorksheetPdf(params);
  doc.save(filename);
}

export default { generateWorksheetPdf, downloadWorksheetPdf };
