import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

global.URL.createObjectURL = vi.fn((value) => value);
