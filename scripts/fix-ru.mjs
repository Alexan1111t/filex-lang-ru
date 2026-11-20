import fs from 'node:fs/promises';

const translationPath = new URL('../translations/ru.json', import.meta.url);
const sourcePath = new URL('../catalogue/filex-catalogue-en.json', import.meta.url);
const translation = JSON.parse(await fs.readFile(translationPath, 'utf8'));
const source = JSON.parse(await fs.readFile(sourcePath, 'utf8'));

Object.assign(translation, {
  'appPlugins.fields.state': 'Статус',
  'appPlugins.setup.addr.colState': 'Статус',
  'plugins.fields.state': 'Статус',
  'sync.fields.state': 'Статус',
  'tenantSelf.domainStatus': 'Статус',
  'tenants.stateColumn': 'Статус',
  'login.realm': 'Область входа',
  'login.realmHint': 'Имя вашей организации для входа. Для входа с локальной учётной записью сервера оставьте поле пустым.',
  'login.realmLocked': 'Этот адрес относится к области входа {realm}.',
  'server.auth_provider.test_realm_required': 'Этот провайдер обслуживает несколько организаций. Укажите область входа тестовой учётной записи.',
  'server.auth_provider.test_realm_unknown': 'Организации с такой областью входа нет.',
  'tenants.errors.realm_empty': 'Для организации требуется область входа.',
  'tenants.errors.realm_immutable': 'Область входа нельзя изменить.',
  'tenants.errors.realm_invalid': 'Только строчные латинские буквы, цифры и дефисы; не более 63 символов. Первый и последний символы должны быть буквой или цифрой.',
  'tenants.errors.realm_none': 'Из этого идентификатора нельзя сформировать область входа. Введите её вручную.',
  'tenants.errors.realm_reserved': 'Эта область входа зарезервирована.',
  'tenants.errors.realm_taken': 'Такая область входа уже используется другой организацией.',
  'tenants.fields.realm': 'Область входа',
  'tenants.fields.slug': 'Идентификатор',
  'tenants.errors.slug_taken': 'Такой идентификатор уже используется другой организацией.',
  'tenants.fields.slugEditHint': 'Его изменение не меняет область входа.',
  'tenants.fields.slugHint': 'Короткий уникальный идентификатор организации на этой платформе. На его основе предлагается область входа.',
  'tenants.platformRealm': 'Нет: пустая область входа',
  'tenants.platformRealmHint': 'У собственной организации платформы нет области входа: её пользователи оставляют поле «Область входа» пустым.',
  'tenants.realmSuggesting': 'Подбирается область входа…',
  'tenantSelf.signinHint': 'Собственный OIDC- или LDAP-провайдер организации. Её пользователи входят через него, указывая область входа; пользователи других организаций не могут им воспользоваться.',
  'tenants.fields.hostHint': 'Хост организации (например, files.acme.example). На его странице входа уже указана организация, поэтому пользователям не нужно вводить область входа. Если поле пустое, они входят по адресу платформы и указывают свою область входа.',
  'tenants.realmSuggestedHint': `Предложено на основе идентификатора; сейчас значение можно изменить. После создания организации область входа изменить нельзя: она входит в адреса учётных записей (alex{'@'}realm.local) и имена пользователей в приложениях (realm/alex).`,
  'conn.guide.s3.fact.bucket': 'Бакет',
  'storages.fields.bucket': 'Бакет',
  'usage.buckets.bucket': 'Бакет',
  'usage.buckets.title': 'По бакетам',
  'conn.s3keys.everyBucket': 'Все доступные мне бакеты',
  'authProviders.tenantsSave': 'Сохранить организации',
  'conn.guide.mount.win.freeLetter': 'Выберите свободную букву диска. Подключение создаёт новый диск; если буква уже занята, команда завершится ошибкой, которая не всегда ясно указывает причину.'
});

for (const key of Object.keys(translation)) {
  translation[key] = translation[key].replace(/[\u2010-\u2015\u2212]/g, '-');
}

const preserveExactly = [
  'server.auth_provider.pam_hint_accepts_anyone',
  'server.auth_provider.pam_hint_pam_broken',
  'server.auth_provider.pam_hint_pam_service_missing',
  'server.auth_provider.pam_hint_pamtester_missing',
  'server.auth_provider.pam_hint_pamtester_not_executable',
  'server.auth_provider.pam_hint_sudo_missing',
  'server.auth_provider.pam_hint_sudo_not_allowed',
  'server.auth_provider.pam_hint_sudo_password_required',
  'server.auth_provider.pam_hint_sudo_requiretty',
  'server.auth_provider.pam_hint_test_account_wrong',
  'server.list.separator',
];

for (const key of preserveExactly) translation[key] = source[key];

await fs.writeFile(translationPath, JSON.stringify(translation, null, 2) + '\n');
