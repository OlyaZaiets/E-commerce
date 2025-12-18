import './ProductModal.scss';
import type { Product } from '../../types/products';
import { ProductForm } from '../ProductForm/ProductForm';
import type { ProductFormValues } from '../ProductForm/ProductForm';

interface Props {
  product?: Product; // 👈 ключовий момент
  onClose: () => void;
  onSave: (data: ProductFormValues, productId?: string) => void;
  isSaving?: boolean;
}

export const ProductModal = ({
  product,
  onClose,
  onSave,
  isSaving,
}: Props) => {
  const isEdit = Boolean(product);

  const initialValues: ProductFormValues = product
  ? {
      title: product.title,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      tags: product.tags,
      ingredients: product.ingredients,
      category: product.category,
      region: product.region,
      holidayType: product.holidayType,
    }
  : {
      title: '',
      description: '',
      price: 0,
      imageUrl: '',
      tags: [],
      ingredients: [],
      category: '',
      region: '',
      holidayType: [],
    };

  return (
    <div className="modal-backdrop" onClick={!isSaving ? onClose : undefined}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>{isEdit ? 'Edit product' : 'Create product'}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="modal-content">
          <ProductForm
            initialValues={initialValues}
            isSubmitting={isSaving}
            onSubmit={(data) => onSave(data, product?._id)}
          />
        </div>
      </div>
    </div>
  );
};
