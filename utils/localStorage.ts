export default class LocalStorage {
  varName: string = '';

  constructor(varName: string) {
    this.varName = varName;
  }

  getValue() {
    const value = window.localStorage.getItem(this.varName);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  }

  static getAnyValue(varName: string) {
    const value = window.localStorage.getItem(varName);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  }

  setValue(value: any) {
    const valueStr = JSON.stringify(value);

    window.localStorage.setItem(this.varName, valueStr);
  }

  clearValue() {
    window.localStorage.removeItem(this.varName);
  }
}
