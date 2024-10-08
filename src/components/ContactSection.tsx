import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import useOnScreen from '../../src/hooks/useOnScreen'; 

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(sectionRef); 


  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя.';
    }

    const phoneRegex = /^\+38\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Введите телефон в формате: +38 (050) 777-44-50';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      console.log('Форма отправлена:', formData);
      setFormSubmitted(true);
    }
  };

  return (
    <motion.section 
      ref={sectionRef} 
      className="section block-content mt-5"
      initial={{ opacity: 0, y: 100 }} 
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }} 
      transition={{ duration: 0.5 }}
    >
      <div className='contact-section'>
        <motion.div 
          className="left-block"
          initial={{ opacity: 0, x: -50 }} 
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className='title-contact white'>У ВАС ОСТАЛИСЬ КАКИЕ-ЛИБО ВОПРОСЫ?</h2>
          <p className='text-bio white'>Введите свои данные, и мы свяжемся с вами, или позвоните нам по указанному ниже номеру</p>
          <a href="tel:+380507774450" className="phone-number">+38 (050) 777-44-50</a>
          <div className="design">
            <p className='design-text'>ДИЗАЙН<br />ПЛАНИРОВКА<br />СТРОИТЕЛЬСТВО<br /></p>
          </div>
        </motion.div>

        <div className="right-block">
          {!formSubmitted ? (
            <motion.form 
              onSubmit={handleSubmit} 
              className="contact-form" 
              initial={{ opacity: 0, x: 50 }} 
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }} 
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img src="../../public/logo.png" alt="Essense House" className="contact-logo" />
              <p>Введите свои данные, и менеджер вам перезвонит</p>

              <motion.input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ваше имя"
                required
                className={errors.name ? 'error-input' : ''}
                whileFocus={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}

              <motion.input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+38 (050) 777-44-50"
                required
                className={errors.phone ? 'error-input' : ''}
                whileFocus={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}

              <motion.button 
                type="submit" 
                className="submit-button text-main white"
                whileHover={{ scale: 1.1, backgroundColor: '#ffcc00' }} 
                whileTap={{ scale: 0.95 }}
              >
                Отправить
              </motion.button>

              <p className="privacy-policy">Политика конфиденциальности</p>
            </motion.form>
          ) : (
            <motion.div 
              className="form-success-message" 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }} 
              exit={{ opacity: 0, scale: 0.8 }} 
              transition={{ duration: 0.5 }}
            >
              <h3>Спасибо за вашу заявку!</h3>
              <p>Мы свяжемся с вами в ближайшее время.</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
