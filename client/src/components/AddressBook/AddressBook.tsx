import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema, type AddressInput } from '../../schemas/addressSchema';
import './AddressBook.scss';
import { useEffect, useState } from 'react';
import { getAddress, updateAddress } from '../../api/address';

export const AddressBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      submitCount, // ✅ КЛЮЧОВЕ
    },
  } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
    mode: 'onSubmit', // ✅ важливо
    defaultValues: {
      country: 'Germany',
      postalCode: '',
      region: '',
      city: '',
      street: '',
      building: '',
    },
  });

  const [loading, setLoading] = useState(true);

useEffect(() => {
  getAddress()
    .then((address) => {
      if (!address) return;

      const parsed = addressSchema.safeParse(address);

      if (!parsed.success) {
        console.error('Invalid address from API', parsed.error);
        return;
      }

      reset(parsed.data); // ✅ тип гарантований
    })
    .catch(console.error)
    .finally(() => setLoading(false));
}, [reset]);

const onSubmit = async (data: AddressInput) => {
  try {
    const saved = await updateAddress(data);

    const parsed = addressSchema.safeParse(saved);

    if (!parsed.success) {
      console.error('Invalid address returned from API', parsed.error);
      alert('Server returned invalid address data');
      return;
    }

    reset(parsed.data); // ✅ типи 100% сходяться

    alert('Address saved successfully!');
  } catch (error: any) {
    alert(error.message || 'Failed to save address');
  }
};

  if (loading) {
    return <p>Loading address...</p>;
  }

  return (
    <div>
      <h2>Address Book</h2>

      {/* ✅ БЕЗ кастомної логіки */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="address-grid">
          <div>
            <label>Country</label>
            <select {...register('country')} className="select-text">
              <option value="Germany">Germany</option>
              <option value="Ukraine">Ukraine</option>
            </select>
          </div>

          <div>
            <label>Postal code</label>
            <input
              className={`input-text ${
                errors.postalCode && submitCount > 0 ? 'input-error' : ''
              }`}
              {...register('postalCode')}
            />
            {errors.postalCode && submitCount > 0 && (
              <p className="error-message">{errors.postalCode.message}</p>
            )}
          </div>

          <div>
            <label>Region</label>
            <input
              className={`input-text ${
                errors.region && submitCount > 0 ? 'input-error' : ''
              }`}
              {...register('region')}
            />
            {errors.region && submitCount > 0 && (
              <p className="error-message">{errors.region.message}</p>
            )}
          </div>

          <div>
            <label>City</label>
            <input
              className={`input-text ${
                errors.city && submitCount > 0 ? 'input-error' : ''
              }`}
              {...register('city')}
            />
            {errors.city && submitCount > 0 && (
              <p className="error-message">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label>Street</label>
            <input
              className={`input-text ${
                errors.street && submitCount > 0 ? 'input-error' : ''
              }`}
              {...register('street')}
            />
            {errors.street && submitCount > 0 && (
              <p className="error-message">{errors.street.message}</p>
            )}
          </div>

          <div>
            <label>House / Apt</label>
            <input
              className={`input-text ${
                errors.building && submitCount > 0 ? 'input-error' : ''
              }`}
              {...register('building')}
            />
            {errors.building && submitCount > 0 && (
              <p className="error-message">{errors.building.message}</p>
            )}
          </div>
        </div>

        <button
          className="dark-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </div>
  );
};
