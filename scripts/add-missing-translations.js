/**
 * Script to add missing translation keys to all language files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LANGUAGES = ['zh', 'es', 'ru', 'de', 'fr', 'pl'];
const LOCALES_DIR = path.join(__dirname, '..', 'src', 'locales');

// Missing keys to add
const MISSING_KEYS = {
  ui: {
    'companiesPage.exchange': {
      zh: '交易所',
      es: 'Intercambio',
      ru: 'Биржа',
      de: 'Börse',
      fr: 'Bourse',
      pl: 'Giełda'
    },
    'organizationCard.exchange': {
      zh: '交易所',
      es: 'Intercambio',
      ru: 'Биржа',
      de: 'Börse',
      fr: 'Bourse',
      pl: 'Giełda'
    },
    'errors.system.networkError': {
      zh: '无法连接到服务器。请检查您的互联网连接并重试。',
      es: 'No se puede conectar al servidor. Por favor, verifique su conexión a Internet e intente nuevamente.',
      ru: 'Не удалось подключиться к серверу. Пожалуйста, проверьте подключение к интернету и попробуйте снова.',
      de: 'Verbindung zum Server fehlgeschlagen. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
      fr: 'Impossible de se connecter au serveur. Veuillez vérifier votre connexion Internet et réessayer.',
      pl: 'Nie można połączyć się z serwerem. Sprawdź połączenie internetowe i spróbuj ponownie.'
    },
    'errors.system.validationError': {
      zh: '您提供的信息无效。请检查并重试。',
      es: 'La información que proporcionó no es válida. Por favor, verifique e intente nuevamente.',
      ru: 'Предоставленная информация недействительна. Пожалуйста, проверьте и попробуйте снова.',
      de: 'Die von Ihnen bereitgestellten Informationen sind ungültig. Bitte überprüfen Sie sie und versuchen Sie es erneut.',
      fr: 'Les informations que vous avez fournies ne sont pas valides. Veuillez vérifier et réessayer.',
      pl: 'Podane informacje są nieprawidłowe. Sprawdź i spróbuj ponownie.'
    },
    'errors.system.authenticationError': {
      zh: '请登录以继续。',
      es: 'Por favor, inicie sesión para continuar.',
      ru: 'Пожалуйста, войдите, чтобы продолжить.',
      de: 'Bitte melden Sie sich an, um fortzufahren.',
      fr: 'Veuillez vous connecter pour continuer.',
      pl: 'Zaloguj się, aby kontynuować.'
    },
    'errors.system.authorizationError': {
      zh: '您没有执行此操作的权限。',
      es: 'No tiene permiso para realizar esta acción.',
      ru: 'У вас нет разрешения на выполнение этого действия.',
      de: 'Sie haben keine Berechtigung, diese Aktion auszuführen.',
      fr: 'Vous n\'avez pas la permission d\'effectuer cette action.',
      pl: 'Nie masz uprawnień do wykonania tej operacji.'
    },
    'errors.system.notFoundError': {
      zh: '找不到请求的资源。',
      es: 'No se pudo encontrar el recurso solicitado.',
      ru: 'Запрошенный ресурс не найден.',
      de: 'Die angeforderte Ressource wurde nicht gefunden.',
      fr: 'La ressource demandée est introuvable.',
      pl: 'Nie znaleziono żądanego zasobu.'
    },
    'errors.system.serverError': {
      zh: '服务器错误。请稍后再试。',
      es: 'Ocurrió un error en el servidor. Por favor, intente más tarde.',
      ru: 'Произошла ошибка сервера. Пожалуйста, попробуйте позже.',
      de: 'Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
      fr: 'Une erreur serveur s\'est produite. Veuillez réessayer plus tard.',
      pl: 'Wystąpił błąd serwera. Spróbuj ponownie później.'
    },
    'errors.system.unexpectedError': {
      zh: '发生意外错误。请重试。',
      es: 'Ocurrió un error inesperado. Por favor, intente nuevamente.',
      ru: 'Произошла неожиданная ошибка. Пожалуйста, попробуйте снова.',
      de: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      fr: 'Une erreur inattendue s\'est produite. Veuillez réessayer.',
      pl: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.'
    },
    'errors.system.unknownError': {
      zh: '出了点问题。请重试。',
      es: 'Algo salió mal. Por favor, intente nuevamente.',
      ru: 'Что-то пошло не так. Пожалуйста, попробуйте снова.',
      de: 'Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.',
      fr: 'Quelque chose s\'est mal passé. Veuillez réessayer.',
      pl: 'Coś poszło nie tak. Spróbuj ponownie.'
    }
  },
  forum: {
    'moderation.pendingTitle': {
      zh: '讨论已提交审核',
      es: 'Discusión enviada para revisión',
      ru: 'Обсуждение отправлено на проверку',
      de: 'Diskussion zur Überprüfung eingereicht',
      fr: 'Discussion soumise pour examen',
      pl: 'Dyskusja przesłana do przeglądu'
    },
    'moderation.pendingMessage': {
      zh: '您的讨论已提交，正在等待审核。一旦管理员批准，它将出现在论坛上。',
      es: 'Su discusión ha sido enviada y está pendiente de moderación. Aparecerá en el foro una vez que un administrador la apruebe.',
      ru: 'Ваше обсуждение отправлено и ожидает модерации. Оно появится на форуме после одобрения администратором.',
      de: 'Ihre Diskussion wurde eingereicht und wartet auf Moderation. Sie wird im Forum erscheinen, sobald ein Administrator sie genehmigt.',
      fr: 'Votre discussion a été soumise et est en attente de modération. Elle apparaîtra sur le forum une fois approuvée par un administrateur.',
      pl: 'Twoja dyskusja została przesłana i oczekuje na moderację. Pojawi się na forum po zatwierdzeniu przez administratora.'
    },
    'moderation.discussionTitle': {
      zh: '您的讨论：',
      es: 'Su discusión:',
      ru: 'Ваше обсуждение:',
      de: 'Ihre Diskussion:',
      fr: 'Votre discussion :',
      pl: 'Twoja dyskusja:'
    },
    'moderation.backToForum': {
      zh: '返回论坛',
      es: 'Volver al foro',
      ru: 'Вернуться на форум',
      de: 'Zurück zum Forum',
      fr: 'Retour au forum',
      pl: 'Wróć do forum'
    },
    'moderation.createAnother': {
      zh: '创建另一个讨论',
      es: 'Crear otra discusión',
      ru: 'Создать другое обсуждение',
      de: 'Weitere Diskussion erstellen',
      fr: 'Créer une autre discussion',
      pl: 'Utwórz kolejną dyskusję'
    }
  }
};

/**
 * Set nested value in object using dot notation
 */
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

/**
 * Add missing keys to a language file
 */
function addMissingKeys(namespace, lang) {
  const filePath = path.join(LOCALES_DIR, lang, `${namespace}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  
  let added = 0;
  const keys = MISSING_KEYS[namespace];
  if (!keys) return;

  for (const [key, translations] of Object.entries(keys)) {
    if (translations[lang]) {
      // Check if key already exists
      const keys = key.split('.');
      let current = data;
      let exists = true;
      for (const k of keys) {
        if (!(k in current)) {
          exists = false;
          break;
        }
        current = current[k];
      }

      if (!exists) {
        setNestedValue(data, key, translations[lang]);
        added++;
      }
    }
  }

  if (added > 0) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`Added ${added} keys to ${lang}/${namespace}.json`);
  }
}

// Main
console.log('Adding missing translation keys...\n');

for (const namespace of Object.keys(MISSING_KEYS)) {
  for (const lang of LANGUAGES) {
    addMissingKeys(namespace, lang);
  }
}

console.log('\nDone!');


