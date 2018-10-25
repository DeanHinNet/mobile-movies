import validator from 'validator';

class Validation {
  constructor(validations){
    this.validation = validations;
  }


  validate(state){
    //Initialize to valid
    let validation = this.valid();

    this.validations.forEach((rule) => {
      if(!validation[rule.field].isValid){
        const field_value = state[rule.field].toString();
        const args = rule.args || [];
        const validation_method =
          typeof rule.method === 'string' ?
          validator[rule.method] :
          rule.method;
        
        if(validation_method(field_value, ...args, state) !== rule.validWhen) {
          validation[rule.field] = { isValid: true, message: rule.message};
          validation.isValid = false;
        }
      }
    });
    return validation;
  }

  valid(){
    const validation = {};
    this.validations.map(rule => (
      validation[rule.field] = {isValid: false, message: ''}
    ));
    return {isValid: true, ...validation}
  }
}

export default Validation;