'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { maskCPF, maskCNPJ, unmaskCPF, unmaskCNPJ } from '@/lib/utils';
import userService from '@/services/user';
import shopService from '@/services/shop';
import NotificationToast from './NotificationToast';

export default function EditUserModal({ 
  isOpen, 
  onClose, 
  userData, 
  isProducer, 
  shopData,
  onSuccess 
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    // Dados da loja (se for produtor)
    shopName: '',
    shopDescription: '',
    shopCnpj: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (isOpen && userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        cpf: userData.cpf || '',
        phone: userData.phone || '',
        shopName: shopData?.name || '',
        shopDescription: shopData?.description || '',
        shopCnpj: shopData?.cnpj || ''
      });
    }
  }, [isOpen, userData, shopData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Preparar dados do usuário
      const userUpdateData = {
        name: formData.name,
        email: formData.email,
        cpf: unmaskCPF(formData.cpf),
        phone: formData.phone
      };

      // Atualizar dados do usuário (funcionalidade limitada)
      const userUpdateResult = await userService.updateUser(userUpdateData);
      
      // Se for produtor e tiver dados da loja, atualizar loja também
      if (isProducer && shopData) {
        const shopUpdateData = {
          name: formData.shopName,
          description: formData.shopDescription,
          cnpj: unmaskCNPJ(formData.shopCnpj)
        };
        
        await shopService.updateShop(shopData.id, shopUpdateData);
      }

      // Mostrar mensagem de sucesso baseada no resultado
      if (userUpdateResult.message) {
        setNotification({
          message: 'Dados da loja atualizados com sucesso! Nota: Atualização de dados pessoais não está disponível no momento.',
          type: 'success'
        });
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      } else {
        setNotification({
          message: 'Dados atualizados com sucesso!',
          type: 'success'
        });
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      }
    } catch (err) {
      console.error('Erro ao atualizar dados:', err);
      setError('Erro ao atualizar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            {isProducer ? 'Editar Dados da Loja' : 'Informações da Conta'}
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados Pessoais */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Dados Pessoais</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Nota:</strong> A atualização de dados pessoais não está disponível no momento. 
                  Apenas dados da loja podem ser editados.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    disabled
                    className="mt-1 bg-gray-100"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="mt-1 bg-gray-100"
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    value={maskCPF(formData.cpf)}
                    disabled
                    className="mt-1 bg-gray-100"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    disabled
                    className="mt-1 bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Dados da Loja (apenas para produtores) */}
            {isProducer && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Dados da Loja</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="shopName">Nome da Loja *</Label>
                    <Input
                      id="shopName"
                      value={formData.shopName}
                      onChange={(e) => handleInputChange('shopName', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shopDescription">Descrição</Label>
                    <Textarea
                      id="shopDescription"
                      value={formData.shopDescription}
                      onChange={(e) => handleInputChange('shopDescription', e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="shopCnpj">CNPJ *</Label>
                    <Input
                      id="shopCnpj"
                      value={maskCNPJ(formData.shopCnpj)}
                      onChange={(e) => handleInputChange('shopCnpj', e.target.value)}
                      required
                      className="mt-1"
                      maxLength={18}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Botões */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-green-500 hover:bg-green-600"
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast de notificação */}
      {notification && (
        <NotificationToast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
