import './EditProductModal.scss';
import type { Product } from '../../types/products';
import { ArrayEditor } from '../ArrayEditor/ArrayEditor';
import { useForm, Controller } from 'react-hook-form';
import { uploadToCloudinary } from '../../utils/cloudinary';


type ProductFormValues = {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  ingredients: string[];
};


interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onSave: (updated: Product) => void;
  isSaving: boolean;
}

export const EditProductModal = ( { product, onClose, onSave, isSaving }: EditProductModalProps)  => {

const {
  control,
  register,
  handleSubmit,
  setValue,
  formState: { isDirty, isSubmitting },
} = useForm<ProductFormValues>({
  defaultValues: {
    title: product.title,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    tags: product.tags,
    ingredients: product.ingredients,
  },
});


  const onSubmit = (data: ProductFormValues) => {
    onSave({
      ...product,
      ...data,
    });
  };



  return (
    <div className="modal-backdrop" onClick={!isSaving ? onClose : undefined}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2>Edit product</h2>
          <button className="close-btn" onClick={!isSaving ? onClose : undefined}>
            ✕
          </button>
        </header>

        <div className="modal-content">
          <label>
            Title
            <input
              type="text"
              {...register('title')}
            />
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

                try {
                  const url = await uploadToCloudinary(file);
                  setValue('imageUrl', url, { shouldDirty: true });
                } catch (err: any) {
                  alert(err.message || 'Upload failed');
                }
              }}
            />
          </label>
{/* 
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="image-preview"
            />
          )} */}


          <Controller 
            control={control}
            name='tags'
            render={({field}) => (
              <ArrayEditor
                label = 'Tags'
                values={field.value}
                placeholder='Add tag and press Enter'
                disabled = {isSubmitting}
                onChange={field.onChange}
              />
            )}
          />

          <Controller 
            control={control}
            name='ingredients'
            render={({field}) => (
              <ArrayEditor
                label = 'Ingredients'
                values={field.value}
                placeholder='Add ingredient and press Enter'
                disabled = {isSubmitting}
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
            <textarea
            {...register('description')}
            />
          </label>
        </div>
        <footer className="modal-footer">
          <button className="secondary-btn" onClick={onClose}>
            Cancel
          </button>

          <button 
            className="dark-btn" 
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty || isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </footer>
      </div>
    </div>
  );
}