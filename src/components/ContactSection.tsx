import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
  };

  return (
    <section className="section block-content ">
        <div className='contact-section'>
            <div className="left-block">
                <h2 className='title-contact white'>У ВАС ОСТАЛИСЬ КАКИЕ-ЛИБО ВОПРОСЫ?</h2>
                <p className='text-bio white'>Введите свои данные, и мы свяжемся с вами, или позвоните нам по указанному ниже номеру</p>
                <a href="tel:+380507774450" className="phone-number">+38 (050) 777-44-50</a>
                <div className="design">
                    <p className='design-text'>ДИЗАЙН<br/>ПЛАНИРОВКА<br/>СТРОИТЕЛЬСТВО<br/></p>
                </div>
            </div>
            <div className="right-block">
                <form onSubmit={handleSubmit} className="contact-form">
                <img  src="../../public/logo.png" alt="Essense House" className="contact-logo" />
                <p>Введите свои данные, и менеджер вам перезвонит</p>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ваше имя"
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+38 (050) 777-44-50"
                    required
                />
                <button type="submit" className="submit-button text-main white">Отправить</button>
                <p className="privacy-policy">Политика конфиденциальности</p>
                </form>
            </div>
        </div>
    </section>
  );
};

export default ContactSection;
