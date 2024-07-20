/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../API'
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType
  __generatedSubscriptionOutput: OutputType
}

export const onCreateAudioFile =
  /* GraphQL */ `subscription OnCreateAudioFile($filter: ModelSubscriptionAudioFileFilterInput) {
  onCreateAudioFile(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateAudioFileSubscriptionVariables,
    APITypes.OnCreateAudioFileSubscription
  >
export const onUpdateAudioFile =
  /* GraphQL */ `subscription OnUpdateAudioFile($filter: ModelSubscriptionAudioFileFilterInput) {
  onUpdateAudioFile(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateAudioFileSubscriptionVariables,
    APITypes.OnUpdateAudioFileSubscription
  >
export const onDeleteAudioFile =
  /* GraphQL */ `subscription OnDeleteAudioFile($filter: ModelSubscriptionAudioFileFilterInput) {
  onDeleteAudioFile(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteAudioFileSubscriptionVariables,
    APITypes.OnDeleteAudioFileSubscription
  >
