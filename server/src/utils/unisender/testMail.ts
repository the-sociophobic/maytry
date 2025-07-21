const axios = require('axios');

const sendEmail = async () => {
  try {
    const response = await axios.post('https://api.unisender.com/ru/api/sendMessage?format=json', null, {
      params: {
        api_key: '6z1isubwj6iok4tigp9dopoxmt4nr9omztawj8ny',
        email: 'costiucigor2002@gmail.com',
        sender_name: 'maytry',
        sender_email: 'order@maytry.ru',
        template_id: '351257494',
        // В sendMessage переменные шаблона передаются через fields
        fields: JSON.stringify({
          amount: 500,
          expiresAt: '31.12.2025',
          // userName: 'Игорь',
        }),
        subject: 'Ваш бонус скоро сгорит!',
      }
    });

    console.log('Результат:', response.data);
  } catch (err) {
    console.error('Ошибка:', err.response?.data || err.message);
  }
};

sendEmail();
