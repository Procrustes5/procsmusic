/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAudioFileInput = {
  id?: string | null
  filename: string
  duration?: number | null
  uploadedBy?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  _version?: number | null
}

export type ModelAudioFileConditionInput = {
  filename?: ModelStringInput | null
  duration?: ModelFloatInput | null
  uploadedBy?: ModelStringInput | null
  createdAt?: ModelStringInput | null
  updatedAt?: ModelStringInput | null
  and?: Array<ModelAudioFileConditionInput | null> | null
  or?: Array<ModelAudioFileConditionInput | null> | null
  not?: ModelAudioFileConditionInput | null
  _deleted?: ModelBooleanInput | null
}

export type ModelStringInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null'
}

export type ModelSizeInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type ModelFloatInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
}

export type ModelBooleanInput = {
  ne?: boolean | null
  eq?: boolean | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
}

export type AudioFile = {
  __typename: 'AudioFile'
  id: string
  filename: string
  duration?: number | null
  uploadedBy?: string | null
  createdAt: string
  updatedAt: string
  _version: number
  _deleted?: boolean | null
  _lastChangedAt: number
}

export type UpdateAudioFileInput = {
  id: string
  filename?: string | null
  duration?: number | null
  uploadedBy?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  _version?: number | null
}

export type DeleteAudioFileInput = {
  id: string
  _version?: number | null
}

export type ModelAudioFileFilterInput = {
  id?: ModelIDInput | null
  filename?: ModelStringInput | null
  duration?: ModelFloatInput | null
  uploadedBy?: ModelStringInput | null
  createdAt?: ModelStringInput | null
  updatedAt?: ModelStringInput | null
  and?: Array<ModelAudioFileFilterInput | null> | null
  or?: Array<ModelAudioFileFilterInput | null> | null
  not?: ModelAudioFileFilterInput | null
  _deleted?: ModelBooleanInput | null
}

export type ModelIDInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export type ModelAudioFileConnection = {
  __typename: 'ModelAudioFileConnection'
  items: Array<AudioFile | null>
  nextToken?: string | null
  startedAt?: number | null
}

export type ModelSubscriptionAudioFileFilterInput = {
  id?: ModelSubscriptionIDInput | null
  filename?: ModelSubscriptionStringInput | null
  duration?: ModelSubscriptionFloatInput | null
  uploadedBy?: ModelSubscriptionStringInput | null
  createdAt?: ModelSubscriptionStringInput | null
  updatedAt?: ModelSubscriptionStringInput | null
  and?: Array<ModelSubscriptionAudioFileFilterInput | null> | null
  or?: Array<ModelSubscriptionAudioFileFilterInput | null> | null
  _deleted?: ModelBooleanInput | null
}

export type ModelSubscriptionIDInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  in?: Array<string | null> | null
  notIn?: Array<string | null> | null
}

export type ModelSubscriptionStringInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  in?: Array<string | null> | null
  notIn?: Array<string | null> | null
}

export type ModelSubscriptionFloatInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
  in?: Array<number | null> | null
  notIn?: Array<number | null> | null
}

export type CreateAudioFileMutationVariables = {
  input: CreateAudioFileInput
  condition?: ModelAudioFileConditionInput | null
}

export type CreateAudioFileMutation = {
  createAudioFile?: {
    __typename: 'AudioFile'
    id: string
    filename: string
    duration?: number | null
    uploadedBy?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type UpdateAudioFileMutationVariables = {
  input: UpdateAudioFileInput
  condition?: ModelAudioFileConditionInput | null
}

export type UpdateAudioFileMutation = {
  updateAudioFile?: {
    __typename: 'AudioFile'
    id: string
    filename: string
    duration?: number | null
    uploadedBy?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type DeleteAudioFileMutationVariables = {
  input: DeleteAudioFileInput
  condition?: ModelAudioFileConditionInput | null
}

export type DeleteAudioFileMutation = {
  deleteAudioFile?: {
    __typename: 'AudioFile'
    id: string
    filename: string
    duration?: number | null
    uploadedBy?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type GetAudioFileQueryVariables = {
  id: string
}

export type GetAudioFileQuery = {
  getAudioFile?: {
    __typename: 'AudioFile'
    id: string
    filename: string
    duration?: number | null
    uploadedBy?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type ListAudioFilesQueryVariables = {
  filter?: ModelAudioFileFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListAudioFilesQuery = {
  listAudioFiles?: {
    __typename: 'ModelAudioFileConnection'
    items: Array<{
      __typename: 'AudioFile'
      id: string
      filename: string
      duration?: number | null
      uploadedBy?: string | null
      createdAt: string
      updatedAt: string
      _version: number
      _deleted?: boolean | null
      _lastChangedAt: number
    } | null>
    nextToken?: string | null
    startedAt?: number | null
  } | null
}

export type SyncAudioFilesQueryVariables = {
  filter?: ModelAudioFileFilterInput | null
  limit?: number | null
  nextToken?: string | null
  lastSync?: number | null
}

export type SyncAudioFilesQuery = {
  syncAudioFiles?: {
    __typename: 'ModelAudioFileConnection'
    items: Array<{
      __typename: 'AudioFile'
      id: string
      filename: string
      duration?: number | null
      uploadedBy?: string | null
      createdAt: string
      updatedAt: string
      _version: number
      _deleted?: boolean | null
      _lastChangedAt: number
    } | null>
    nextToken?: string | null
    startedAt?: number | null
  } | null
}

export type OnCreateAudioFileSubscriptionVariables = {
  filter?: ModelSubscriptionAudioFileFilterInput | null
}

export type OnCreateAudioFileSubscription = {
  onCreateAudioFile?: {
    __typename: 'AudioFile'
    id: string
    filename: string
    duration?: number | null
    uploadedBy?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type OnUpdateAudioFileSubscriptionVariables = {
  filter?: ModelSubscriptionAudioFileFilterInput | null
}

export type OnUpdateAudioFileSubscription = {
  onUpdateAudioFile?: {
    __typename: 'AudioFile'
    id: string
    filename: string
    duration?: number | null
    uploadedBy?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type OnDeleteAudioFileSubscriptionVariables = {
  filter?: ModelSubscriptionAudioFileFilterInput | null
}

export type OnDeleteAudioFileSubscription = {
  onDeleteAudioFile?: {
    __typename: 'AudioFile'
    id: string
    filename: string
    duration?: number | null
    uploadedBy?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}
