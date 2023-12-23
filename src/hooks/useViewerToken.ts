import { useEffect, useState } from 'react';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

import { useToast } from './useToast';
import { createViewerToken } from '@/actions/token';

export const useViewerToken = (hostId: string) => {
  const [token, setToken] = useState(''),
    [name, setName] = useState(''),
    [identity, setIdentity] = useState('');
  const { displayToast } = useToast();

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostId);
        setToken(viewerToken);

        const { name, jti } = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        if (jti) setIdentity(jti);
        if (name) setName(name);
      } catch (err) {
        displayToast("Couldn't create token", {
          description:
            err instanceof Error
              ? err.message
              : 'Something went wrong while creating your user token.',
        });
      }
    };

    createToken();
  }, [displayToast, hostId]);

  return { token, name, identity };
};
