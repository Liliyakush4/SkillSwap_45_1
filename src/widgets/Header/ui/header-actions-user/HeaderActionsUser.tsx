import cls from './HeaderActionsUser.module.css';

export const HeaderActionsUser = () => {
  return (
    <div className={cls.wrapper}>
      <button type="button" className={cls.iconButton}>
        ❤
      </button>

      <button type="button" className={cls.iconButton}>
        🔔
      </button>

      <div className={cls.profile}>
        <span className={cls.name}>Иван</span>
        <div className={cls.avatar} />
      </div>
    </div>
  );
};
