/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../API'
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType
  __generatedQueryOutput: OutputType
}

export const getAudioFile = /* GraphQL */ `query GetAudioFile($id: ID!) {
  getAudioFile(id: $id) {
    id
    filename
    duration
    uploadedBy
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetAudioFileQueryVariables, APITypes.GetAudioFileQuery>
export const listAudioFiles = /* GraphQL */ `query ListAudioFiles(
  $filter: ModelAudioFileFilterInput
  $limit: Int
  $nextToken: String
) {
  listAudioFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      filename
      duration
      uploadedBy
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListAudioFilesQueryVariables, APITypes.ListAudioFilesQuery>
export const syncAudioFiles = /* GraphQL */ `query SyncAudioFiles(
  $filter: ModelAudioFileFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncAudioFiles(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      filename
      duration
      uploadedBy
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncAudioFilesQueryVariables, APITypes.SyncAudioFilesQuery>
