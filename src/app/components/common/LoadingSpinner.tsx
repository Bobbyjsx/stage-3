import classNames from 'classnames';

type LoadingSpinnerProps = {
  className?: string;
};

export const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div
      className={classNames(
        'h-24 w-24 animate-spin rounded-full border-4 border-white',
        className
      )}
    />
  );
};
