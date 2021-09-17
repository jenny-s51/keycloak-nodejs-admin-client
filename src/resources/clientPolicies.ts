import Resource from './resource';
import {KeycloakAdminClient} from '../client';
import ClientProfilesRepresentation from '../defs/clientProfilesRepresentation';
import ClientPoliciesRepresentation from '../defs/clientPoliciesRepresentation';
import ClientPolicyRepresentation from '../defs/clientPolicyRepresentation';

/**
 * https://www.keycloak.org/docs-api/15.0/rest-api/#_client_registration_policy_resource
 */
export class ClientPolicies extends Resource<{realm?: string}> {
  constructor(client: KeycloakAdminClient) {
    super(client, {
      path: '/admin/realms/{realm}/client-policies',
      getUrlParams: () => ({
        realm: client.realmName,
      }),
      getBaseUrl: () => client.baseUrl,
    });
  }

  public listProfiles = this.makeRequest<
    {includeGlobalProfiles?: boolean},
    ClientProfilesRepresentation
  >({
    method: 'GET',
    path: '/profiles',
    queryParamKeys: ['include-global-profiles'],
    keyTransform: {
      includeGlobalProfiles: 'include-global-profiles',
    },
  });

  public listPolicies = this.makeRequest<void, ClientPoliciesRepresentation>({
    method: 'GET',
    path: '/policies',
  });

  public createPolicy = this.makeRequest<ClientPoliciesRepresentation, void>({
    method: 'PUT',
    path: '/policies',
  });

  public updatePolicy = this.makeUpdateRequest<
    {policies: ClientPolicyRepresentation[]},
    ClientPoliciesRepresentation
  >({
    method: 'PUT',
    path: '/policies',
  });
}
