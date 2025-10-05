import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type FormData = {
  fullName: string;
  birthDate: string;
  gender: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  phone: string;
  alternatePhone: string;
  email: string;
  maritalStatus: string;
  childrenCount: string;
  companyName: string;
  position: string;
  workExperience: string;
  companyPhone: string;
  companyAddress: string;
  companyEmail: string;
  monthlyIncome: string;
  additionalIncome: string;
  hasOtherLoans: string;
  loanType: string;
  loanAmount: string;
  loanBalance: string;
  monthlyPayment: string;
  propertyType: string[];
  propertyValue: string;
  hasAutoLoanExperience: string;
  previousBank: string;
  previousLoanAmount: string;
  previousLoanStatus: string;
  ogrn: string;
  inn: string;
  carBrand: string;
  carModel: string;
  carYear: string;
  carPrice: string;
  downPayment: string;
  loanProgram: string;
  additionalServices: string[];
  carChoiceReason: string[];
  businessUse: string;
  usageFrequency: string;
  internationalTravel: string;
  insuranceLevel: string;
  contact1Name: string;
  contact1Relation: string;
  contact1Phone: string;
  contact1Email: string;
  contact2Name: string;
  contact2Relation: string;
  contact2Phone: string;
  contact2Email: string;
  dataConsent: boolean;
};

const Index = () => {
  const { toast } = useToast();
  const [stage, setStage] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    birthDate: '',
    gender: '',
    street: '',
    city: '',
    region: '',
    postalCode: '',
    phone: '',
    alternatePhone: '',
    email: '',
    maritalStatus: '',
    childrenCount: '',
    companyName: '',
    position: '',
    workExperience: '',
    companyPhone: '',
    companyAddress: '',
    companyEmail: '',
    monthlyIncome: '',
    additionalIncome: '',
    hasOtherLoans: '',
    loanType: '',
    loanAmount: '',
    loanBalance: '',
    monthlyPayment: '',
    propertyType: [],
    propertyValue: '',
    hasAutoLoanExperience: '',
    previousBank: '',
    previousLoanAmount: '',
    previousLoanStatus: '',
    ogrn: '',
    inn: '',
    carBrand: '',
    carModel: '',
    carYear: '',
    carPrice: '',
    downPayment: '',
    loanProgram: '',
    additionalServices: [],
    carChoiceReason: [],
    businessUse: '',
    usageFrequency: '',
    internationalTravel: '',
    insuranceLevel: '',
    contact1Name: '',
    contact1Relation: '',
    contact1Phone: '',
    contact1Email: '',
    contact2Name: '',
    contact2Relation: '',
    contact2Phone: '',
    contact2Email: '',
    dataConsent: false,
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: 'propertyType' | 'additionalServices' | 'carChoiceReason', value: string) => {
    setFormData(prev => {
      const currentValues = prev[field] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const validateForm = () => {
    const requiredFields = [
      'fullName', 'birthDate', 'gender', 'street', 'city', 'region', 'postalCode',
      'phone', 'email', 'maritalStatus', 'childrenCount', 'companyName', 'position',
      'workExperience', 'companyPhone', 'companyAddress', 'companyEmail', 'monthlyIncome',
      'hasOtherLoans', 'carBrand', 'carModel', 'carYear', 'carPrice', 'downPayment',
      'loanProgram', 'businessUse', 'usageFrequency', 'internationalTravel', 'insuranceLevel',
      'contact1Name', 'contact1Relation', 'contact1Phone', 'contact1Email',
      'contact2Name', 'contact2Relation', 'contact2Phone', 'contact2Email'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        return false;
      }
    }

    if (!formData.dataConsent) {
      return false;
    }

    if (formData.hasOtherLoans === 'yes' && (!formData.loanType || !formData.loanAmount || !formData.loanBalance || !formData.monthlyPayment)) {
      return false;
    }

    if (formData.hasAutoLoanExperience === 'yes' && (!formData.previousBank || !formData.previousLoanAmount || !formData.previousLoanStatus)) {
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Ошибка заполнения",
        description: "Пожалуйста, заполните все обязательные поля анкеты",
      });
      return;
    }

    setStage('processing');
    setTimeout(() => {
      setStage('success');
    }, 10000);
  };

  if (stage === 'processing') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="animate-spin">
              <Icon name="Loader2" size={64} className="text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Обработка данных</h2>
          <p className="text-muted-foreground">Пожалуйста, подождите. Ваша анкета обрабатывается...</p>
        </Card>
      </div>
    );
  }

  if (stage === 'success') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="CheckCircle2" size={48} className="text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Данные успешно отправлены</h2>
          <p className="text-muted-foreground mb-6">
            Ваша анкета № А/С 58675-25 успешно получена и отправлена на рассмотрение. 
            Наш специалист свяжется с вами в ближайшее время.
          </p>
          <div className="p-4 bg-accent/50 rounded-lg">
            <p className="text-sm text-accent-foreground font-semibold">
              Среднее время рассмотрения: 1-2 рабочих дня
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Icon name="Building2" size={40} className="text-primary mr-3" />
            <h1 className="text-3xl font-bold text-foreground">Льготное Автокредитование</h1>
          </div>
          <p className="text-muted-foreground">Электронный бланк-анкета № А/С 58675-25</p>
          <p className="text-sm text-muted-foreground mt-2">Программа «Добросовестный заемщик»</p>
        </div>

        <Card className="p-8 shadow-lg">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                <Icon name="User" size={24} className="mr-2 text-primary" />
                Данные о клиенте
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="fullName">ФИО (Полное имя) *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Иванов Иван Иванович"
                  />
                </div>

                <div>
                  <Label htmlFor="birthDate">Дата рождения *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Пол *</Label>
                  <RadioGroup value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="font-normal">Мужской</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="font-normal">Женский</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="street">Улица *</Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                    placeholder="ул. Пушкина, д. 10, кв. 5"
                  />
                </div>

                <div>
                  <Label htmlFor="city">Город *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Москва"
                  />
                </div>

                <div>
                  <Label htmlFor="region">Регион *</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                    placeholder="Московская область"
                  />
                </div>

                <div>
                  <Label htmlFor="postalCode">Почтовый индекс *</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    placeholder="123456"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div>
                  <Label htmlFor="alternatePhone">Альтернативный телефон</Label>
                  <Input
                    id="alternatePhone"
                    type="tel"
                    value={formData.alternatePhone}
                    onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                    placeholder="+7 (999) 765-43-21"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="example@mail.ru"
                  />
                </div>

                <div>
                  <Label>Семейное положение *</Label>
                  <RadioGroup value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="single" id="single" />
                        <Label htmlFor="single" className="font-normal">Не женат/не замужем</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="married" id="married" />
                        <Label htmlFor="married" className="font-normal">Женат/замужем</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="divorced" id="divorced" />
                        <Label htmlFor="divorced" className="font-normal">В разводе</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="widowed" id="widowed" />
                        <Label htmlFor="widowed" className="font-normal">Вдова/вдовец</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="childrenCount">Количество детей *</Label>
                  <Input
                    id="childrenCount"
                    type="number"
                    min="0"
                    value={formData.childrenCount}
                    onChange={(e) => handleInputChange('childrenCount', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Briefcase" size={20} className="mr-2 text-primary" />
                Сведения о месте работы
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="companyName">Название компании *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="ООО «Компания»"
                  />
                </div>

                <div>
                  <Label htmlFor="position">Должность *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="Менеджер"
                  />
                </div>

                <div>
                  <Label htmlFor="workExperience">Стаж работы (лет) *</Label>
                  <Input
                    id="workExperience"
                    type="number"
                    min="0"
                    value={formData.workExperience}
                    onChange={(e) => handleInputChange('workExperience', e.target.value)}
                    placeholder="5"
                  />
                </div>

                <div>
                  <Label htmlFor="companyPhone">Контактный телефон компании *</Label>
                  <Input
                    id="companyPhone"
                    type="tel"
                    value={formData.companyPhone}
                    onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                    placeholder="+7 (495) 123-45-67"
                  />
                </div>

                <div>
                  <Label htmlFor="companyEmail">Email компании *</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={formData.companyEmail}
                    onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                    placeholder="info@company.ru"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="companyAddress">Адрес компании *</Label>
                  <Input
                    id="companyAddress"
                    value={formData.companyAddress}
                    onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                    placeholder="г. Москва, ул. Ленина, д. 1"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                <Icon name="Wallet" size={24} className="mr-2 text-primary" />
                Данные о финансовом состоянии
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="monthlyIncome">Месячный доход (рублей) *</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    min="0"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                    placeholder="100000"
                  />
                </div>

                <div>
                  <Label htmlFor="additionalIncome">Дополнительные источники дохода</Label>
                  <Input
                    id="additionalIncome"
                    value={formData.additionalIncome}
                    onChange={(e) => handleInputChange('additionalIncome', e.target.value)}
                    placeholder="Инвестиции, аренда"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Наличие других кредитов *</Label>
                  <RadioGroup value={formData.hasOtherLoans} onValueChange={(value) => handleInputChange('hasOtherLoans', value)}>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="hasLoansYes" />
                        <Label htmlFor="hasLoansYes" className="font-normal">Да</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="hasLoansNo" />
                        <Label htmlFor="hasLoansNo" className="font-normal">Нет</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {formData.hasOtherLoans === 'yes' && (
                  <>
                    <div>
                      <Label htmlFor="loanType">Вид кредита</Label>
                      <Input
                        id="loanType"
                        value={formData.loanType}
                        onChange={(e) => handleInputChange('loanType', e.target.value)}
                        placeholder="Ипотека, потребительский"
                      />
                    </div>

                    <div>
                      <Label htmlFor="loanAmount">Сумма кредита (рублей)</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        min="0"
                        value={formData.loanAmount}
                        onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                        placeholder="500000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="loanBalance">Остаток долга (рублей)</Label>
                      <Input
                        id="loanBalance"
                        type="number"
                        min="0"
                        value={formData.loanBalance}
                        onChange={(e) => handleInputChange('loanBalance', e.target.value)}
                        placeholder="300000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="monthlyPayment">Ежемесячный платеж (рублей)</Label>
                      <Input
                        id="monthlyPayment"
                        type="number"
                        min="0"
                        value={formData.monthlyPayment}
                        onChange={(e) => handleInputChange('monthlyPayment', e.target.value)}
                        placeholder="15000"
                      />
                    </div>
                  </>
                )}

                <div className="md:col-span-2">
                  <Label>Наличие собственности</Label>
                  <div className="space-y-3 mt-2">
                    {['Квартира', 'Дом', 'Земельный участок', 'Другое'].map((property) => (
                      <div key={property} className="flex items-center space-x-2">
                        <Checkbox
                          id={`property-${property}`}
                          checked={formData.propertyType.includes(property)}
                          onCheckedChange={() => handleCheckboxChange('propertyType', property)}
                        />
                        <Label htmlFor={`property-${property}`} className="font-normal">
                          {property}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="propertyValue">Оценочная стоимость имущества (рублей)</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    min="0"
                    value={formData.propertyValue}
                    onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                    placeholder="5000000"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Есть ли у вас опыт получения автокредита?</Label>
                  <RadioGroup value={formData.hasAutoLoanExperience} onValueChange={(value) => handleInputChange('hasAutoLoanExperience', value)}>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="experienceYes" />
                        <Label htmlFor="experienceYes" className="font-normal">Да</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="experienceNo" />
                        <Label htmlFor="experienceNo" className="font-normal">Нет</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {formData.hasAutoLoanExperience === 'yes' && (
                  <>
                    <div>
                      <Label htmlFor="previousBank">Название банка</Label>
                      <Input
                        id="previousBank"
                        value={formData.previousBank}
                        onChange={(e) => handleInputChange('previousBank', e.target.value)}
                        placeholder="Сбербанк"
                      />
                    </div>

                    <div>
                      <Label htmlFor="previousLoanAmount">Сумма кредита (рублей)</Label>
                      <Input
                        id="previousLoanAmount"
                        type="number"
                        min="0"
                        value={formData.previousLoanAmount}
                        onChange={(e) => handleInputChange('previousLoanAmount', e.target.value)}
                        placeholder="800000"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label>Статус кредита</Label>
                      <RadioGroup value={formData.previousLoanStatus} onValueChange={(value) => handleInputChange('previousLoanStatus', value)}>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paid" id="statusPaid" />
                            <Label htmlFor="statusPaid" className="font-normal">Выплачен</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="inProgress" id="statusInProgress" />
                            <Label htmlFor="statusInProgress" className="font-normal">В процессе</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="ogrn">ОГРН (для ИП)</Label>
                  <Input
                    id="ogrn"
                    value={formData.ogrn}
                    onChange={(e) => handleInputChange('ogrn', e.target.value)}
                    placeholder="1234567890123"
                  />
                </div>

                <div>
                  <Label htmlFor="inn">ИНН (для ИП)</Label>
                  <Input
                    id="inn"
                    value={formData.inn}
                    onChange={(e) => handleInputChange('inn', e.target.value)}
                    placeholder="123456789012"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                <Icon name="Car" size={24} className="mr-2 text-primary" />
                Данные о приобретаемом автомобиле
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="carBrand">Марка автомобиля *</Label>
                  <Input
                    id="carBrand"
                    value={formData.carBrand}
                    onChange={(e) => handleInputChange('carBrand', e.target.value)}
                    placeholder="Toyota"
                  />
                </div>

                <div>
                  <Label htmlFor="carModel">Модель автомобиля *</Label>
                  <Input
                    id="carModel"
                    value={formData.carModel}
                    onChange={(e) => handleInputChange('carModel', e.target.value)}
                    placeholder="Camry"
                  />
                </div>

                <div>
                  <Label htmlFor="carYear">Год выпуска *</Label>
                  <Input
                    id="carYear"
                    type="number"
                    min="1990"
                    max="2025"
                    value={formData.carYear}
                    onChange={(e) => handleInputChange('carYear', e.target.value)}
                    placeholder="2024"
                  />
                </div>

                <div>
                  <Label htmlFor="carPrice">Цена автомобиля (рублей) *</Label>
                  <Input
                    id="carPrice"
                    type="number"
                    min="0"
                    value={formData.carPrice}
                    onChange={(e) => handleInputChange('carPrice', e.target.value)}
                    placeholder="2500000"
                  />
                </div>

                <div>
                  <Label htmlFor="downPayment">Первоначальный взнос (рублей) *</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    min="0"
                    value={formData.downPayment}
                    onChange={(e) => handleInputChange('downPayment', e.target.value)}
                    placeholder="500000"
                  />
                </div>

                <div>
                  <Label>Программа автокредита *</Label>
                  <RadioGroup value={formData.loanProgram} onValueChange={(value) => handleInputChange('loanProgram', value)}>
                    <div className="space-y-2 mt-2">
                      {['standard', 'preferential', 'tradeIn', 'other'].map((program) => (
                        <div key={program} className="flex items-center space-x-2">
                          <RadioGroupItem value={program} id={`program-${program}`} />
                          <Label htmlFor={`program-${program}`} className="font-normal">
                            {program === 'standard' && 'Стандартный'}
                            {program === 'preferential' && 'Льготный'}
                            {program === 'tradeIn' && 'Программа Trade-in'}
                            {program === 'other' && 'Другой'}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="md:col-span-2">
                  <Label>Дополнительные услуги</Label>
                  <div className="space-y-3 mt-2">
                    {['Индивидуальное страхование', 'Сервисное обслуживание', 'КАСКО', 'Гарантия на автомобиль', 'Другие'].map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${service}`}
                          checked={formData.additionalServices.includes(service)}
                          onCheckedChange={() => handleCheckboxChange('additionalServices', service)}
                        />
                        <Label htmlFor={`service-${service}`} className="font-normal">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                <Icon name="HelpCircle" size={24} className="mr-2 text-primary" />
                Дополнительные вопросы от банка
              </h2>
              
              <div className="space-y-6">
                <div>
                  <Label>Какая причина выбора именно этого автомобиля?</Label>
                  <div className="space-y-3 mt-2">
                    {['Цена', 'Надежность', 'Дизайн', 'Технические характеристики', 'Другие'].map((reason) => (
                      <div key={reason} className="flex items-center space-x-2">
                        <Checkbox
                          id={`reason-${reason}`}
                          checked={formData.carChoiceReason.includes(reason)}
                          onCheckedChange={() => handleCheckboxChange('carChoiceReason', reason)}
                        />
                        <Label htmlFor={`reason-${reason}`} className="font-normal">
                          {reason}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Планируете ли вы использовать автомобиль для бизнеса? *</Label>
                  <RadioGroup value={formData.businessUse} onValueChange={(value) => handleInputChange('businessUse', value)}>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="businessYes" />
                        <Label htmlFor="businessYes" className="font-normal">Да</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="businessNo" />
                        <Label htmlFor="businessNo" className="font-normal">Нет</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Как часто вы планируете использовать автомобиль? *</Label>
                  <RadioGroup value={formData.usageFrequency} onValueChange={(value) => handleInputChange('usageFrequency', value)}>
                    <div className="space-y-2 mt-2">
                      {['daily', 'severalTimesWeek', 'rarely', 'other'].map((freq) => (
                        <div key={freq} className="flex items-center space-x-2">
                          <RadioGroupItem value={freq} id={`freq-${freq}`} />
                          <Label htmlFor={`freq-${freq}`} className="font-normal">
                            {freq === 'daily' && 'Каждый день'}
                            {freq === 'severalTimesWeek' && 'Несколько раз в неделю'}
                            {freq === 'rarely' && 'Редко'}
                            {freq === 'other' && 'Другой график'}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Будете ли вы использовать автомобиль для поездок за границу? *</Label>
                  <RadioGroup value={formData.internationalTravel} onValueChange={(value) => handleInputChange('internationalTravel', value)}>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="travelYes" />
                        <Label htmlFor="travelYes" className="font-normal">Да</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="travelNo" />
                        <Label htmlFor="travelNo" className="font-normal">Нет</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Какой уровень страхования вы рассматриваете? *</Label>
                  <RadioGroup value={formData.insuranceLevel} onValueChange={(value) => handleInputChange('insuranceLevel', value)}>
                    <div className="space-y-2 mt-2">
                      {['minimal', 'standard', 'fullKasko', 'none'].map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <RadioGroupItem value={level} id={`insurance-${level}`} />
                          <Label htmlFor={`insurance-${level}`} className="font-normal">
                            {level === 'minimal' && 'Минимальное'}
                            {level === 'standard' && 'Стандартное'}
                            {level === 'fullKasko' && 'Полное КАСКО'}
                            {level === 'none' && 'Не планирую страховать'}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                <Icon name="Users" size={24} className="mr-2 text-primary" />
                Контактные лица
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Первое контактное лицо</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="contact1Name">ФИО *</Label>
                      <Input
                        id="contact1Name"
                        value={formData.contact1Name}
                        onChange={(e) => handleInputChange('contact1Name', e.target.value)}
                        placeholder="Петров Петр Петрович"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact1Relation">Отношение к вам *</Label>
                      <Input
                        id="contact1Relation"
                        value={formData.contact1Relation}
                        onChange={(e) => handleInputChange('contact1Relation', e.target.value)}
                        placeholder="Друг, коллега, родственник"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact1Phone">Телефон *</Label>
                      <Input
                        id="contact1Phone"
                        type="tel"
                        value={formData.contact1Phone}
                        onChange={(e) => handleInputChange('contact1Phone', e.target.value)}
                        placeholder="+7 (999) 111-22-33"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="contact1Email">Email *</Label>
                      <Input
                        id="contact1Email"
                        type="email"
                        value={formData.contact1Email}
                        onChange={(e) => handleInputChange('contact1Email', e.target.value)}
                        placeholder="contact1@mail.ru"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Второе контактное лицо</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="contact2Name">ФИО *</Label>
                      <Input
                        id="contact2Name"
                        value={formData.contact2Name}
                        onChange={(e) => handleInputChange('contact2Name', e.target.value)}
                        placeholder="Сидоров Сидор Сидорович"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact2Relation">Отношение к вам *</Label>
                      <Input
                        id="contact2Relation"
                        value={formData.contact2Relation}
                        onChange={(e) => handleInputChange('contact2Relation', e.target.value)}
                        placeholder="Друг, коллега, родственник"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact2Phone">Телефон *</Label>
                      <Input
                        id="contact2Phone"
                        type="tel"
                        value={formData.contact2Phone}
                        onChange={(e) => handleInputChange('contact2Phone', e.target.value)}
                        placeholder="+7 (999) 444-55-66"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="contact2Email">Email *</Label>
                      <Input
                        id="contact2Email"
                        type="email"
                        value={formData.contact2Email}
                        onChange={(e) => handleInputChange('contact2Email', e.target.value)}
                        placeholder="contact2@mail.ru"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-t pt-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="dataConsent"
                  checked={formData.dataConsent}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, dataConsent: checked as boolean }))}
                />
                <Label htmlFor="dataConsent" className="font-normal text-sm leading-relaxed cursor-pointer">
                  Я, {formData.fullName || '_____________________'}, даю согласие на обработку моих персональных данных в соответствии с законодательством Российской Федерации *
                </Label>
              </div>
            </section>

            <div className="flex justify-end pt-6">
              <Button 
                size="lg" 
                onClick={handleSubmit}
                className="px-12"
              >
                <Icon name="Send" size={20} className="mr-2" />
                Отправить анкету
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>* - обязательные поля для заполнения</p>
          <p className="mt-2">Дата заполнения: {new Date().toLocaleDateString('ru-RU')}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
