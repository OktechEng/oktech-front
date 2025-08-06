'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from "react";
import ActionButtons from '../components/ActionButtons';
import { maskCPF } from '@/lib/utils';

export default function DetalhesDaConta({
  userData,
  handleEditInfo,
  handleDeleteAccount,
}) {
  return (
    <>
      <h2 className="text-lg font-semibold mb-6">Informações de Contato</h2>
      <div className="space-y-6 mb-10 max-w-sm">
        <div>
          <Label className="text-gray-700 text-sm" htmlFor="name">
            Nome
          </Label>
          <Input
            id="name"
            value={userData?.name || ''}
            disabled
            readOnly
            className="bg-gray-100 mt-1"
          />
        </div>
        <div>
          <Label className="text-gray-700 text-sm" htmlFor="email">
            E-mail
          </Label>
          <Input
            id="email"
            value={userData?.email || ''}
            disabled
            readOnly
            className="bg-gray-100 mt-1"
          />
        </div>
        {/* <div>
          <Label className="text-gray-700 text-sm" htmlFor="telefone">
            Telefone
          </Label>
          <Input
            id="telefone"
            value={userData?.telefone || ''}
            disabled
            readOnly
            className="bg-gray-100 mt-1"
          />
        </div> */}
        <div>
          <Label className="text-gray-700 text-sm" htmlFor="cpf">
            CPF
          </Label>
          <Input
            id="cpf"
            value={maskCPF(userData?.cpf) || ''}
            disabled
            readOnly
            className="bg-gray-100 mt-1"
          />
        </div>
      </div>

      {/* Seção Endereço de Entrega */}
      <h2 className="text-lg font-semibold">Endereço de Entrega</h2>
      <div className="text-center py-16 text-gray-500 mb-4">
        Informações de local de entrega em desenvolvimento...
      </div>

      {/* Botões componentizados */}
      <ActionButtons 
        primaryAction={handleEditInfo}
        primaryLabel="Editar Informações"
        secondaryAction={handleDeleteAccount}
        secondaryLabel="Excluir Conta"
      />
    </>
  );
}
