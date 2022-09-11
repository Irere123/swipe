import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  leaderboard?: Maybe<Array<Maybe<User>>>;
  me?: Maybe<User>;
  topPeople?: Maybe<Array<Maybe<User>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  location?: Maybe<Scalars['String']>;
  numLikes?: Maybe<Scalars['String']>;
  online?: Maybe<Scalars['Boolean']>;
  username?: Maybe<Scalars['String']>;
};

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id?: string | null, username?: string | null, displayName?: string | null, avatarUrl?: string | null, gender?: string | null, location?: string | null, online?: boolean | null } | null> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id?: string | null, username?: string | null, avatarUrl?: string | null, displayName?: string | null, online?: boolean | null } | null };

export type LeaderboardQueryVariables = Exact<{ [key: string]: never; }>;


export type LeaderboardQuery = { __typename?: 'Query', leaderboard?: Array<{ __typename?: 'User', id?: string | null, username?: string | null, avatarUrl?: string | null, displayName?: string | null, bio?: string | null, gender?: string | null, birthday?: string | null, numLikes?: string | null } | null> | null };

export type TopPeopleQueryVariables = Exact<{ [key: string]: never; }>;


export type TopPeopleQuery = { __typename?: 'Query', topPeople?: Array<{ __typename?: 'User', id?: string | null, username?: string | null, avatarUrl?: string | null } | null> | null };


export const UsersDocument = gql`
    query Users {
  users {
    id
    username
    displayName
    avatarUrl
    gender
    location
    online
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    avatarUrl
    displayName
    online
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const LeaderboardDocument = gql`
    query Leaderboard {
  leaderboard {
    id
    username
    avatarUrl
    displayName
    bio
    gender
    birthday
    numLikes
  }
}
    `;

/**
 * __useLeaderboardQuery__
 *
 * To run a query within a React component, call `useLeaderboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeaderboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLeaderboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useLeaderboardQuery(baseOptions?: Apollo.QueryHookOptions<LeaderboardQuery, LeaderboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LeaderboardQuery, LeaderboardQueryVariables>(LeaderboardDocument, options);
      }
export function useLeaderboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LeaderboardQuery, LeaderboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LeaderboardQuery, LeaderboardQueryVariables>(LeaderboardDocument, options);
        }
export type LeaderboardQueryHookResult = ReturnType<typeof useLeaderboardQuery>;
export type LeaderboardLazyQueryHookResult = ReturnType<typeof useLeaderboardLazyQuery>;
export type LeaderboardQueryResult = Apollo.QueryResult<LeaderboardQuery, LeaderboardQueryVariables>;
export const TopPeopleDocument = gql`
    query TopPeople {
  topPeople {
    id
    username
    avatarUrl
  }
}
    `;

/**
 * __useTopPeopleQuery__
 *
 * To run a query within a React component, call `useTopPeopleQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopPeopleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopPeopleQuery({
 *   variables: {
 *   },
 * });
 */
export function useTopPeopleQuery(baseOptions?: Apollo.QueryHookOptions<TopPeopleQuery, TopPeopleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopPeopleQuery, TopPeopleQueryVariables>(TopPeopleDocument, options);
      }
export function useTopPeopleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopPeopleQuery, TopPeopleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopPeopleQuery, TopPeopleQueryVariables>(TopPeopleDocument, options);
        }
export type TopPeopleQueryHookResult = ReturnType<typeof useTopPeopleQuery>;
export type TopPeopleLazyQueryHookResult = ReturnType<typeof useTopPeopleLazyQuery>;
export type TopPeopleQueryResult = Apollo.QueryResult<TopPeopleQuery, TopPeopleQueryVariables>;