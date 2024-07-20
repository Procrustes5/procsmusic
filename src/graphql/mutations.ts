/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../API'
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType
  __generatedMutationOutput: OutputType
}

export const createAudioFile = /* GraphQL */ `mutation CreateAudioFile(
  $input: CreateAudioFileInput!
  $condition: ModelAudioFileConditionInput
) {
  createAudioFile(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.CreateAudioFileMutationVariables, APITypes.CreateAudioFileMutation>
export const updateAudioFile = /* GraphQL */ `mutation UpdateAudioFile(
  $input: UpdateAudioFileInput!
  $condition: ModelAudioFileConditionInput
) {
  updateAudioFile(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.UpdateAudioFileMutationVariables, APITypes.UpdateAudioFileMutation>
export const deleteAudioFile = /* GraphQL */ `mutation DeleteAudioFile(
  $input: DeleteAudioFileInput!
  $condition: ModelAudioFileConditionInput
) {
  deleteAudioFile(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.DeleteAudioFileMutationVariables, APITypes.DeleteAudioFileMutation>
