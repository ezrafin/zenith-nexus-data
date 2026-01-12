/**
 * Add moderation page translation keys to all language files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LANGUAGES = ['zh', 'es', 'ru', 'de', 'fr', 'pl'];
const LOCALES_DIR = path.join(__dirname, '..', 'src', 'locales');

const translations = {
  zh: {
    failedToLoadPendingDiscussions: '加载待审核讨论失败',
    failedToLoadPendingReplies: '加载待审核回复失败',
    failedToLoadPendingEvaluations: '加载待审核评估失败',
    discussionApproved: '讨论已批准',
    discussionRejectedDeleted: '讨论已拒绝并删除',
    replyApproved: '回复已批准',
    replyRejectedDeleted: '回复已拒绝并删除',
    evaluationApproved: '评估已批准',
    evaluationRejectedDeleted: '评估已拒绝并删除',
    failedToUpdateDiscussion: '更新讨论失败',
    failedToUpdateReply: '更新回复失败',
    failedToUpdateEvaluation: '更新评估失败'
  },
  es: {
    failedToLoadPendingDiscussions: 'Error al cargar discusiones pendientes',
    failedToLoadPendingReplies: 'Error al cargar respuestas pendientes',
    failedToLoadPendingEvaluations: 'Error al cargar evaluaciones pendientes',
    discussionApproved: 'Discusión aprobada',
    discussionRejectedDeleted: 'Discusión rechazada y eliminada',
    replyApproved: 'Respuesta aprobada',
    replyRejectedDeleted: 'Respuesta rechazada y eliminada',
    evaluationApproved: 'Evaluación aprobada',
    evaluationRejectedDeleted: 'Evaluación rechazada y eliminada',
    failedToUpdateDiscussion: 'Error al actualizar discusión',
    failedToUpdateReply: 'Error al actualizar respuesta',
    failedToUpdateEvaluation: 'Error al actualizar evaluación'
  },
  ru: {
    failedToLoadPendingDiscussions: 'Не удалось загрузить ожидающие обсуждения',
    failedToLoadPendingReplies: 'Не удалось загрузить ожидающие ответы',
    failedToLoadPendingEvaluations: 'Не удалось загрузить ожидающие оценки',
    discussionApproved: 'Обсуждение одобрено',
    discussionRejectedDeleted: 'Обсуждение отклонено и удалено',
    replyApproved: 'Ответ одобрен',
    replyRejectedDeleted: 'Ответ отклонен и удален',
    evaluationApproved: 'Оценка одобрена',
    evaluationRejectedDeleted: 'Оценка отклонена и удалена',
    failedToUpdateDiscussion: 'Не удалось обновить обсуждение',
    failedToUpdateReply: 'Не удалось обновить ответ',
    failedToUpdateEvaluation: 'Не удалось обновить оценку'
  },
  de: {
    failedToLoadPendingDiscussions: 'Fehler beim Laden ausstehender Diskussionen',
    failedToLoadPendingReplies: 'Fehler beim Laden ausstehender Antworten',
    failedToLoadPendingEvaluations: 'Fehler beim Laden ausstehender Bewertungen',
    discussionApproved: 'Diskussion genehmigt',
    discussionRejectedDeleted: 'Diskussion abgelehnt und gelöscht',
    replyApproved: 'Antwort genehmigt',
    replyRejectedDeleted: 'Antwort abgelehnt und gelöscht',
    evaluationApproved: 'Bewertung genehmigt',
    evaluationRejectedDeleted: 'Bewertung abgelehnt und gelöscht',
    failedToUpdateDiscussion: 'Fehler beim Aktualisieren der Diskussion',
    failedToUpdateReply: 'Fehler beim Aktualisieren der Antwort',
    failedToUpdateEvaluation: 'Fehler beim Aktualisieren der Bewertung'
  },
  fr: {
    failedToLoadPendingDiscussions: 'Échec du chargement des discussions en attente',
    failedToLoadPendingReplies: 'Échec du chargement des réponses en attente',
    failedToLoadPendingEvaluations: 'Échec du chargement des évaluations en attente',
    discussionApproved: 'Discussion approuvée',
    discussionRejectedDeleted: 'Discussion rejetée et supprimée',
    replyApproved: 'Réponse approuvée',
    replyRejectedDeleted: 'Réponse rejetée et supprimée',
    evaluationApproved: 'Évaluation approuvée',
    evaluationRejectedDeleted: 'Évaluation rejetée et supprimée',
    failedToUpdateDiscussion: 'Échec de la mise à jour de la discussion',
    failedToUpdateReply: 'Échec de la mise à jour de la réponse',
    failedToUpdateEvaluation: 'Échec de la mise à jour de l\'évaluation'
  },
  pl: {
    failedToLoadPendingDiscussions: 'Nie udało się załadować oczekujących dyskusji',
    failedToLoadPendingReplies: 'Nie udało się załadować oczekujących odpowiedzi',
    failedToLoadPendingEvaluations: 'Nie udało się załadować oczekujących ocen',
    discussionApproved: 'Dyskusja zatwierdzona',
    discussionRejectedDeleted: 'Dyskusja odrzucona i usunięta',
    replyApproved: 'Odpowiedź zatwierdzona',
    replyRejectedDeleted: 'Odpowiedź odrzucona i usunięta',
    evaluationApproved: 'Ocena zatwierdzona',
    evaluationRejectedDeleted: 'Ocena odrzucona i usunięta',
    failedToUpdateDiscussion: 'Nie udało się zaktualizować dyskusji',
    failedToUpdateReply: 'Nie udało się zaktualizować odpowiedzi',
    failedToUpdateEvaluation: 'Nie udało się zaktualizować oceny'
  }
};

function setNestedValue(obj, key, value) {
  const keys = key.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (!(k in current) || typeof current[k] !== 'object' || current[k] === null) {
      current[k] = {};
    }
    current = current[k];
  }
  current[keys[keys.length - 1]] = value;
}

for (const lang of LANGUAGES) {
  const filePath = path.join(LOCALES_DIR, lang, 'ui.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  
  if (!data.toast) {
    data.toast = {};
  }
  
  const langTranslations = translations[lang];
  for (const [key, value] of Object.entries(langTranslations)) {
    if (!data.toast[key]) {
      data.toast[key] = value;
    }
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Added moderation translations to ${lang}/ui.json`);
}

console.log('Done!');

