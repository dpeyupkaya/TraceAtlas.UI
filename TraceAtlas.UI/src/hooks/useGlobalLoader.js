import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../store/slices/uiSlice';

export const useGlobalLoader = () => {
  const dispatch = useDispatch();

  /**
   * Asenkron bir işlemi loading bar ile sarmalar.
   * @param {Function} asyncFn
   */
  const withLoader = async (asyncFn) => {
    try {
      dispatch(showLoading());
   
      
      await asyncFn();
    } catch (error) {
      throw error; 
    } finally {
      dispatch(hideLoading());
    }
  };

  return { withLoader };
};