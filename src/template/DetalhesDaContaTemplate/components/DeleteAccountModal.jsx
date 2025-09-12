'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import userService from '@/services/user';

export default function DeleteAccountModal({ 
  isOpen, 
  onClose, 
  userData,
  onSuccess 
}) {
  const [confirmationText, setConfirmationText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const expectedText = 'EXCLUIR CONTA';
  const isConfirmationValid = confirmationText === expectedText;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConfirmationValid) {
      setError('Por favor, digite exatamente "EXCLUIR CONTA" para confirmar.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await userService.deleteAccount();
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Erro ao excluir conta:', err);
      // Usar a mensagem de erro específica do serviço
      setError(err.message || 'Erro ao excluir conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setConfirmationText('');
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Excluir Conta</h2>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              <strong>Atenção:</strong> Esta ação é irreversível. Ao excluir sua conta:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Todos os seus dados pessoais serão removidos permanentemente</li>
              <li>Seus pedidos e histórico serão perdidos</li>
              <li>Se você for produtor, sua loja e produtos serão removidos</li>
              <li>Você não poderá recuperar sua conta</li>
            </ul>
            <p className="text-gray-700 font-medium">
              Para confirmar a exclusão, digite <span className="font-bold text-red-600">EXCLUIR CONTA</span> no campo abaixo:
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <p className="text-blue-800 text-sm">
                <strong>Nota:</strong> Se você encontrar um erro 500, isso pode indicar um problema temporário no servidor. 
                Tente novamente em alguns minutos ou entre em contato com o suporte técnico.
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="confirmation">Confirmação</Label>
              <Input
                id="confirmation"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="Digite: EXCLUIR CONTA"
                className="mt-1"
                autoComplete="off"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={loading || !isConfirmationValid}
              >
                {loading ? 'Excluindo...' : 'Excluir Conta'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
