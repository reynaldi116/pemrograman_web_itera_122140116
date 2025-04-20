import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });
  
  test('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    expect(result.current[0]).toBe('initialValue');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('testKey');
  });
  
  test('returns parsed value from localStorage when available', () => {
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify('storedValue'));
    
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    expect(result.current[0]).toBe('storedValue');
  });
  
  test('stores value in localStorage when updated', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    act(() => {
      result.current[1]('newValue');
    });
    
    expect(result.current[0]).toBe('newValue');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('newValue'));
  });
  
  test('handles objects correctly', () => {
    const initialObject = { name: 'test', value: 123 };
    const { result } = renderHook(() => useLocalStorage('objectKey', initialObject));
    
    expect(result.current[0]).toEqual(initialObject);
    
    const newObject = { name: 'updated', value: 456 };
    
    act(() => {
      result.current[1](newObject);
    });
    
    expect(result.current[0]).toEqual(newObject);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('objectKey', JSON.stringify(newObject));
  });
  
  test('handles function updates correctly', () => {
    const { result } = renderHook(() => useLocalStorage('countKey', 0));
    
    act(() => {
      result.current[1]((prev) => prev + 1);
    });
    
    expect(result.current[0]).toBe(1);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('countKey', JSON.stringify(1));
  });
});