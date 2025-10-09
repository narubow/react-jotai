import React from 'react'
import styles from './style.module.scss'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const FormPrivate: React.FC = () => {

  const formValidate = z.object({
    firstName: z.string().min(1, '名前は必須です').max(30, '名前は30文字以内で入力してください'),
    lastName: z.string().min(1, '姓は必須です').max(30, '姓は30文字以内で入力してください'),
    telNumber: z.string().regex(/^0\d{9,10}$/, "電話番号は日本番号で10桁または11桁で入力してください。"),
    emailTxt: z.string()
    .min(4, 'Eメールは有効なメールアドレスで入力してください。')
    .max(100, 'Eメールは有効なメールアドレスで入力してください。')
    .refine((email) => email.includes('@'), 'Eメールは有効なメールアドレスで入力してください。')
    .refine((email) => email.includes('.'), 'Eメールは有効なメールアドレスで入力してください。')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Eメールは有効なメールアドレスで入力してください。')
  });

  type FormData = z.infer<typeof formValidate>;
  
  const { register, handleSubmit, reset, setValue, trigger, formState } = useForm<FormData>({
    resolver: zodResolver(formValidate),
    mode: 'all' // 入力値が変更されるたび・フォーカスが外れた時・送信時 にバリデーション実行
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  }

  // 各フィールドの個別リセット
  const resetFirstName = () => {
    setValue('firstName', '');
    trigger('firstName');
  };

  const resetLastName = () => {
    setValue('lastName', '');
    trigger('lastName');
  };

  const resetTelNumber = () => {
    setValue('telNumber', '');
    trigger('telNumber');
  };

  const resetEmail = () => {
    setValue('emailTxt', '');
    trigger('emailTxt');
  };

  // 全体リセット
  const handleReset = () => {
    reset();
  };

  return (
    <>
      <div className={styles.formPrivate}>
        <h1>個人情報入力画面</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.formPrivate__form}>
          <div className={styles.formPrivate__formGroup}>

            <label className={styles.formPrivate__label}>
              <span className={styles.formPrivate__labelText}>名前</span>
              <input type="text" {...register('firstName')} className={styles.formPrivate__input} />
              <button type="button" onClick={resetFirstName} className={styles.formPrivate__fieldResetBtn}>×</button>
            </label>
            {formState.errors.firstName && <p className={styles.formPrivate__error}>{String(formState.errors.firstName.message)}</p>}

            <label className={styles.formPrivate__label}>
              <span className={styles.formPrivate__labelText}>姓</span>
              <input type="text" {...register('lastName')} className={styles.formPrivate__input} />
              <button type="button" onClick={resetLastName} className={styles.formPrivate__fieldResetBtn}>×</button>
            </label>
            {formState.errors.lastName && <p className={styles.formPrivate__error}>{String(formState.errors.lastName.message)}</p>}

            <label className={styles.formPrivate__label}>
              <span className={styles.formPrivate__labelText}>電話番号</span>
              <input type="text" {...register('telNumber')} className={styles.formPrivate__input} />
              <button type="button" onClick={resetTelNumber} className={styles.formPrivate__fieldResetBtn}>×</button>
            </label>
            {formState.errors.telNumber && <p className={styles.formPrivate__error}>{String(formState.errors.telNumber.message)}</p>}
            
            <label className={styles.formPrivate__label}>
              <span className={styles.formPrivate__labelText}>Eメール</span>
              <input type="text" {...register('emailTxt')} className={styles.formPrivate__input} />
              <button type="button" onClick={resetEmail} className={styles.formPrivate__fieldResetBtn}>×</button>
            </label>
            {formState.errors.emailTxt && <p className={styles.formPrivate__error}>{String(formState.errors.emailTxt.message)}</p>}

            <button type="button" onClick={handleReset} className={styles.formPrivate__resetBtn}>リセット</button>
            <button type="submit" className={styles.formPrivate__submitBtn}>送信</button>
          </div>
        </form>
      </div>
    </>
  )
}