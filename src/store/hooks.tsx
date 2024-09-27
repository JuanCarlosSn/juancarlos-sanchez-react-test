import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/**
 * Hook personalizado para usar el dispatch de Redux con el tipo AppDispatch.
 * @returns El dispatch de Redux tipado con AppDispatch.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Hook personalizado para usar el selector de Redux con el tipo RootState.
 * @type TypedUseSelectorHook<RootState>
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;