import { RegisterStep2Form } from '@features/auth/ui/register-step-2-form';

const genderOptions = [
  { value: '', label: 'Не указан' },
  { value: 'm', label: 'Мужской' },
  { value: 'f', label: 'Женский' },
];

const cityOptions = [
  { value: 'msk', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'samara', label: 'Самара' },
  { value: 'saratov', label: 'Саратов' },
  { value: 'ekb', label: 'Екатеринбург' },
  { value: 'nnov', label: 'Нижний Новгород' },
  { value: 'kzn', label: 'Казань' },
  { value: 'chelyabinsk', label: 'Челябинск' },
  { value: 'omsk', label: 'Омск' },
  { value: 'rostov', label: 'Ростов-на-Дону' },
  { value: 'ufa', label: 'Уфа' },
  { value: 'krasnoyarsk', label: 'Красноярск' },
  { value: 'voronezh', label: 'Воронеж' },
  { value: 'perm', label: 'Пермь' },
  { value: 'volgograd', label: 'Волгоград' },
  { value: 'krasnodar', label: 'Краснодар' },
  { value: 'tyumen', label: 'Тюмень' },
  { value: 'tolyatti', label: 'Тольятти' },
  { value: 'izhevsk', label: 'Ижевск' },
  { value: 'barnaul', label: 'Барнаул' },
  { value: 'ulyanovsk', label: 'Ульяновск' },
  { value: 'irkutsk', label: 'Иркутск' },
  { value: 'khabarovsk', label: 'Хабаровск' },
  { value: 'yaroslavl', label: 'Ярославль' },
  { value: 'vladivostok', label: 'Владивосток' },
  { value: 'makhachkala', label: 'Махачкала' },
  { value: 'tomsk', label: 'Томск' },
  { value: 'orenburg', label: 'Оренбург' },
  { value: 'kemerovo', label: 'Кемерово' },
  { value: 'novokuznetsk', label: 'Новокузнецк' },
  { value: 'ryazan', label: 'Рязань' },
  { value: 'astrakhan', label: 'Астрахань' },
  { value: 'naberezhnye', label: 'Набережные Челны' },
  { value: 'penza', label: 'Пенза' },
  { value: 'lipetsk', label: 'Липецк' },
  { value: 'tula', label: 'Тула' },
  { value: 'kirov', label: 'Киров' },
  { value: 'cheboksary', label: 'Чебоксары' },
  { value: 'kaliningrad', label: 'Калининград' },
  { value: 'bryansk', label: 'Брянск' },
  { value: 'kursk', label: 'Курск' },
  { value: 'ivanovo', label: 'Иваново' },
  { value: 'magnitogorsk', label: 'Магнитогорск' },
  { value: 'tver', label: 'Тверь' },
  { value: 'stavropol', label: 'Ставрополь' },
  { value: 'sochi', label: 'Сочи' },
  { value: 'simferopol', label: 'Симферополь' },
];

const skillCategoryLearnOptions = [
  { value: 'business', label: 'Бизнес и карьера' },
  { value: 'creativity', label: 'Творчество и искусство' },
  { value: 'languages', label: 'Иностранные языки' },
  { value: 'health', label: 'Здоровье и лайфстайл' },
  { value: 'home', label: 'Дом и уют' },
];

const skillSubcategoryLearnOptions = [
  { value: 'drawing', label: 'Рисование и иллюстрация' },
  { value: 'photography', label: 'Фотография' },
  { value: 'video', label: 'Видеомонтаж' },
  { value: 'music_sound', label: 'Музыка и звук' },
  { value: 'acting', label: 'Актёрское мастерство' },
  { value: 'writing', label: 'Креативное письмо' },
  { value: 'art_therapy', label: 'Арт-терапия' },
  { value: 'decor_diy', label: 'Декор и DIY' },
];

export default function RegisterStep2() {
  return (
    <div style={{ padding: '24px 16px', minHeight: '100vh' }}>
      <RegisterStep2Form
        values={{
          name: '',
          birthDate: null,
          gender: '',
          city: null,
          skillCategoryLearn: [],
          skillSubcategoryLearn: [],
        }}
        genderOptions={genderOptions}
        cityOptions={cityOptions}
        skillCategoryLearnOptions={skillCategoryLearnOptions}
        skillSubcategoryLearnOptions={skillSubcategoryLearnOptions}
        onSubmit={(data) => console.log('Submit:', data)}
        onBack={() => console.log('Back')}
      />
    </div>
  );
}
