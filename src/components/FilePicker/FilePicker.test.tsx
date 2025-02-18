import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilePicker } from 'src/components/FilePicker/FilePicker';

describe('FilePicker', () => {
  const file1 = new File(['file1'], 'file1.png', { type: 'image/png' });
  const file2 = new File(['file2'], 'file2.png', { type: 'image/png' });
  const files = [file1, file2];

  function rederComponent({ onSelect }: { onSelect?: () => void } = {}) {
    const handleSelect = onSelect ? onSelect : vi.fn();

    return render(<FilePicker name="file" id="file" onSelect={handleSelect} />);
  }

  it('should render the FilePicker component', () => {
    rederComponent();

    const input = document.getElementById('file');
    const uploadButton = screen.getByRole('button', { name: /upload/i });

    expect(input).toBeInTheDocument();
    expect(uploadButton).toBeInTheDocument();
  });

  it('should open the file picker when the upload button is clicked', async () => {
    rederComponent();

    const input = document.getElementById('file') as HTMLInputElement;
    const uploadButton = screen.getByRole('button', { name: /upload/i });
    const inputClickSpy = vi.spyOn(input, 'click');

    const user = userEvent.setup();
    await user.click(uploadButton);

    expect(inputClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should trigger onSelect', () => {
    const handleSelect = vi.fn();

    rederComponent({ onSelect: handleSelect });

    const input = document.getElementById('file') as HTMLInputElement;
    fireEvent.change(input, { target: { files } });

    expect(handleSelect).toHaveBeenCalledWith(files);
  });

  it('should render previews', () => {
    const handleSelect = vi.fn();

    rederComponent({ onSelect: handleSelect });

    const input = document.getElementById('file') as HTMLInputElement;
    fireEvent.change(input, { target: { files } });

    waitFor(() => {
      const previews = screen.getAllByRole('img');

      previews.forEach((preview, index) => {
        const file = files[index];

        expect(preview).toHaveAttribute(
          'src',
          expect.stringContaining(file.name)
        );
        expect(preview).toHaveAttribute('alt', file.name);
      });
    });
  });
});
