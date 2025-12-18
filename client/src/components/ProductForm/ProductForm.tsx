
import { useForm, Controller } from 'react-hook-form';
import { ArrayEditor } from '../ArrayEditor/ArrayEditor';
import { uploadToCloudinary } from '../../utils/cloudinary';

export type ProductFormValues = {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  ingredients: string[];

  category: string;
  region: string;
  holidayType: string[];
};


interface ProductFormProps {
  initialValues: ProductFormValues;
  onSubmit: (data: ProductFormValues) => void;
  isSubmitting?: boolean;
}

export const ProductForm = ({
  initialValues,
  onSubmit,
  isSubmitting,
}: ProductFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm<ProductFormValues>({
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="product-form">
      <label>
        Title
        <input type="text" {...register('title')} />
      </label>

      <label>
        Product image
        <input
          type="file"
          accept="image/*"
          disabled={isSubmitting}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const url = await uploadToCloudinary(file);
            setValue('imageUrl', url, { shouldDirty: true });
          }}
        />
      </label>

      <Controller
        control={control}
        name="tags"
        render={({ field }) => (
          <ArrayEditor
            label="Tags"
            values={field.value}
            placeholder="Add tag and press Enter"
            disabled={isSubmitting}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="ingredients"
        render={({ field }) => (
          <ArrayEditor
            label="Ingredients"
            values={field.value}
            placeholder="Add ingredient and press Enter"
            disabled={isSubmitting}
            onChange={field.onChange}
          />
        )}
      />

      <label>
        Price (€ per 100 g)
        <input
          type="number"
          min={0}
          step={0.1}
          {...register('price', { valueAsNumber: true })}
        />
      </label>

      <label>
        Description
        <textarea {...register('description')} />
      </label>

      <label>
        Category
        <select {...register('category')} required>
          <option value="">Select category</option>
          <option value="soup">Soups & First Courses</option>
          <option value="main">Main Dishes</option>
          <option value="bakery">Bread & Pastries</option>
          <option value="dessert">Desserts & Sweets</option>
          <option value="salad">Starters & Salads</option>
          <option value="drink">Drinks & Beverages</option>
        </select>
      </label>

      <label>
        Region
        <select {...register('region')} required>
          <option value="">Select region</option>
          <option value="Kyiv">Kyiv</option>
          <option value="Lviv">Lviv</option>
          <option value="Poltava">Poltava</option>
          <option value="Odesa">Odesa</option>
        </select>
      </label>

      <fieldset>
        <legend>Holiday type</legend>

        <label>
          <input
            type="checkbox"
            value="Christmas"
            {...register('holidayType')}
          />
          Christmas
        </label>

        <label>
          <input
            type="checkbox"
            value="Easter"
            {...register('holidayType')}
          />
          Easter
        </label>

        <label>
          <input
            type="checkbox"
            value="Everyday"
            {...register('holidayType')}
          />
          Everyday
        </label>
      </fieldset>


      <button
        type="submit"
        className="dark-btn"
        disabled={!isDirty || isSubmitting}
      >
        Save
      </button>
    </form>
  );
};
