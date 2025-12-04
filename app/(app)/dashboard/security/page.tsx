'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Lock, Trash2, Loader2 } from 'lucide-react';
import { useActionState } from 'react';
import { updatePassword, deleteAccount } from '@/app/(login)/actions';

type PasswordState = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  error?: string;
  success?: string;
};

type DeleteState = {
  password?: string;
  error?: string;
  success?: string;
};

export default function SecurityPage() {
  const [passwordState, passwordAction, isPasswordPending] = useActionState<
    PasswordState,
    FormData
  >(updatePassword, {});

  const [deleteState, deleteAction, isDeletePending] = useActionState<
    DeleteState,
    FormData
  >(deleteAccount, {});

  return (
    <section className="flex-1 px-4 lg:px-8">
      <h1 className="heading2">
        Security Settings
      </h1>
      <hr />
      <h2>Update Password</h2>
      <div className='max-w-lg py-4'>
        <form className="space-y-4" action={passwordAction}>
          <div>
            <Label htmlFor="current-password" className="mb-2">
              Current Password
            </Label>
            <Input
              id="current-password"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              required
              minLength={8}
              maxLength={100}
              defaultValue={passwordState.currentPassword}
            />
          </div>
          <div>
            <Label htmlFor="new-password" className="mb-2">
              New Password
            </Label>
            <Input
              id="new-password"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={100}
              defaultValue={passwordState.newPassword}
            />
          </div>
          <div>
            <Label htmlFor="confirm-password" className="mb-2">
              Confirm New Password
            </Label>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              maxLength={100}
              defaultValue={passwordState.confirmPassword}
            />
          </div>
          {passwordState.error && (
            <p className="text-sm text-red-500">{passwordState.error}</p>
          )}
          {passwordState.success && (
            <p className="text-sm text-success">{passwordState.success}</p>
          )}
          <Button
            type="submit"
            className="text-white bg-primary hover:bg-primary-glow"
            disabled={isPasswordPending}
          >
            {isPasswordPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Update Password
              </>
            )}
          </Button>
        </form>
      </div>
      <div className="max-w-lg py-4">
        <h2>Delete Account</h2>
        <p className="mb-4 text-sm text-gray-500">
          Account deletion is non-reversable. Please proceed with caution.
        </p>
        <form action={deleteAction} className="space-y-4">
          <div>
            <Label htmlFor="delete-password" className="mb-2">
              Confirm Password
            </Label>
            <Input
              id="delete-password"
              name="password"
              type="password"
              required
              minLength={8}
              maxLength={100}
              defaultValue={deleteState.password}
            />
          </div>
          {deleteState.error && (
            <p className="text-sm text-red-500">{deleteState.error}</p>
          )}
          <Button
            type="submit"
            variant="destructive"
            disabled={isDeletePending}
          >
            {isDeletePending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
