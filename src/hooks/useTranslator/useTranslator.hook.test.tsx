import { fireEvent, render, screen } from '@solidjs/testing-library';
import { Availability, Lang } from '../../configs/locale/locale.type';
import useTranslator from './useTranslator.hook';

const testLocale: Lang[] = [
  {
    en: 'Welcome',
    id: 'Selamat Datang',
  },
  {
    en: 'Change Language',
    id: 'Ganti Bahasa',
  },
  {
    unique: 'Unique',
    en: 'Welcome',
    id: 'Selamat Datang Unik',
  },
];

function TestComponent() {
  const { translate, changeLanguage } = useTranslator(testLocale);

  return (
    <div>
      <h1 data-testid="normal">{translate('Welcome')}</h1>
      <h2 data-testid="unique">{translate('Welcome', 'Unique')}</h2>
      <h3 data-testid="not-found">{translate('Not Found')}</h3>
      <button
        onClick={() =>
          changeLanguage((lang) => (lang === Availability.en ? Availability.id : Availability.en))
        }
      >
        {translate('Change Language')}
      </button>
    </div>
  );
}

describe('useTranslator hook', () => {
  it('should be able translate correctly', () => {
    // ARRANGE
    render(() => <TestComponent />);

    // ACT
    fireEvent.click(screen.getByRole('button'));

    // ASSERT
    expect(screen.getByText('Selamat Datang')).toBeInTheDocument();
    expect(screen.getByText('Selamat Datang Unik')).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();

    // ACT
    fireEvent.click(screen.getByRole('button'));

    // ASSERT
    expect(screen.getByTestId('normal')).toBeInTheDocument();
    expect(screen.getByTestId('unique')).toHaveTextContent('Welcome');
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
