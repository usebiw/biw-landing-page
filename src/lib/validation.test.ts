import { describe, expect, it } from 'vitest';
import { isValidEmail, isValidPhone, validateDemoForm, type DemoFormData } from './validation';

const validForm: DemoFormData = {
  name: 'Ana Torres',
  company: 'Constructora ABC',
  role: 'Directora de Proyecto',
  email: 'ana@constructoraabc.com',
  phone: '+57 300 123 4567',
  activeProjects: '3',
  consent: true,
};

describe('isValidEmail', () => {
  it('accepts a well-formed email', () => {
    expect(isValidEmail('ana@constructoraabc.com')).toBe(true);
  });

  it('rejects an email with no domain', () => {
    expect(isValidEmail('ana@')).toBe(false);
  });

  it('rejects an email with no @', () => {
    expect(isValidEmail('ana.constructoraabc.com')).toBe(false);
  });
});

describe('isValidPhone', () => {
  it('accepts a Colombian mobile number with country code', () => {
    expect(isValidPhone('+57 300 123 4567')).toBe(true);
  });

  it('rejects a phone number that is too short', () => {
    expect(isValidPhone('123')).toBe(false);
  });

  it('rejects a phone number with letters', () => {
    expect(isValidPhone('300-ABC-4567')).toBe(false);
  });
});

describe('validateDemoForm', () => {
  it('returns no errors for a fully valid submission', () => {
    expect(validateDemoForm(validForm)).toEqual({});
  });

  it('flags every required field when the form is empty', () => {
    const errors = validateDemoForm({
      name: '',
      company: '',
      role: '',
      email: '',
      phone: '',
      activeProjects: '',
      consent: false,
    });

    expect(Object.keys(errors)).toEqual(
      expect.arrayContaining(['name', 'company', 'role', 'email', 'phone', 'activeProjects', 'consent']),
    );
  });

  it('flags an invalid email without touching other valid fields', () => {
    const errors = validateDemoForm({ ...validForm, email: 'not-an-email' });
    expect(errors.email).toBeDefined();
    expect(errors.name).toBeUndefined();
  });

  it('requires activeProjects to be a plain number', () => {
    const errors = validateDemoForm({ ...validForm, activeProjects: 'muchas' });
    expect(errors.activeProjects).toBeDefined();
  });

  it('requires consent to proceed', () => {
    const errors = validateDemoForm({ ...validForm, consent: false });
    expect(errors.consent).toBeDefined();
  });
});
