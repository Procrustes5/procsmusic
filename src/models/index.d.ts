import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerAudioFile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AudioFile, 'id'>;
  };
  readonly id: string;
  readonly filename: string;
  readonly duration?: number | null;
  readonly uploadedBy?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyAudioFile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AudioFile, 'id'>;
  };
  readonly id: string;
  readonly filename: string;
  readonly duration?: number | null;
  readonly uploadedBy?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type AudioFile = LazyLoading extends LazyLoadingDisabled ? EagerAudioFile : LazyAudioFile

export declare const AudioFile: (new (init: ModelInit<AudioFile>) => AudioFile) & {
  copyOf(source: AudioFile, mutator: (draft: MutableModel<AudioFile>) => MutableModel<AudioFile> | void): AudioFile;
}