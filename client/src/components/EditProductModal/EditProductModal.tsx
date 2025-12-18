import { useState } from 'react';
import type { Product } from '../../types/products';
import './EditProductModal.scss';
import { ArrayEditor } from '../ArrayEditor/ArrayEditor';

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onSave: (updated: Product) => void;
  isSaving: boolean;
}

export const EditProductModal = ( { product, onClose, onSave, isSaving }: EditProductModalProps)  => {

  const [draft, setDraft] = useState<Product>(product);


  const handleSave = () => {
    onSave(draft);
  };

  const isUnchanged =
  draft.title === product.title &&
  draft.description === product.description &&
  draft.price === product.price &&
  draft.imageUrl === product.imageUrl &&
  JSON.stringify(draft.tags) === JSON.stringify(product.tags) &&
  JSON.stringify(draft.ingredients) === JSON.stringify(product.ingredients);


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
              value={draft.title}
              onChange={(e) =>
                setDraft(prev => ({ ...prev, title: e.target.value }))
              }
            />
          </label>

          <label>
            Image URL
            <input
              type="text"
              value={draft.imageUrl}
              onChange={(e) =>
                setDraft(prev => ({ ...prev, imageUrl: e.target.value }))
              }
            />
          </label>

          <ArrayEditor
            label = 'Tags'
            values={draft.tags}
            placeholder='Add tag and press Enter'
            disabled = {isSaving}
            onChange={(tags) => 
              setDraft(prev => ({ ...prev, tags }))
            }
          />

          <ArrayEditor
            label = 'Ingredients'
            values={draft.ingredients}
            placeholder='Add ingredient and press Enter'
            disabled = {isSaving}
            onChange={(ingredients) => 
              setDraft(prev => ({ ...prev, ingredients }))
            }
          />

          <label>
            Price (€ per 100 g)
            <input
              type="number"
              min={0}
              step={0.1}
              value={draft.price}
              onChange={(e) =>
                setDraft(prev => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
            />
          </label>

          <label>
            Description
            <textarea
              value={draft.description}
              onChange={(e) =>
                setDraft(prev => ({ ...prev, description: e.target.value }))
              }
            />
          </label>
        </div>
        <footer className="modal-footer">
          <button className="secondary-btn" onClick={onClose}>
            Cancel
          </button>

          <button 
            className="dark-btn" 
            onClick={handleSave}
            disabled={isUnchanged || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </footer>
      </div>
    </div>
  );
}