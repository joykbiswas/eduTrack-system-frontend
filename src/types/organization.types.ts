export interface IOrganization {
  id: string;
  name: string;
  description: string;
  parentId?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  parent?: IOrganization | null;
  children: IOrganization[];
  classes: Array<{
    id: string;
    name: string;
  }>;
}
