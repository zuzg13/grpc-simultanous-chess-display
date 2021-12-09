/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./game_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.GameServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.GameServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Empty,
 *   !proto.UserList>}
 */
const methodDescriptor_GameService_GetAllUsers = new grpc.web.MethodDescriptor(
  '/GameService/GetAllUsers',
  grpc.web.MethodType.UNARY,
  proto.Empty,
  proto.UserList,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.UserList.deserializeBinary
);


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.UserList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.UserList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.getAllUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/GetAllUsers',
      request,
      metadata || {},
      methodDescriptor_GameService_GetAllUsers,
      callback);
};


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.UserList>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.getAllUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/GetAllUsers',
      request,
      metadata || {},
      methodDescriptor_GameService_GetAllUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.User,
 *   !proto.UserId>}
 */
const methodDescriptor_GameService_AddNewUser = new grpc.web.MethodDescriptor(
  '/GameService/AddNewUser',
  grpc.web.MethodType.UNARY,
  proto.User,
  proto.UserId,
  /**
   * @param {!proto.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.UserId.deserializeBinary
);


/**
 * @param {!proto.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.UserId)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.UserId>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.addNewUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/AddNewUser',
      request,
      metadata || {},
      methodDescriptor_GameService_AddNewUser,
      callback);
};


/**
 * @param {!proto.User} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.UserId>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.addNewUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/AddNewUser',
      request,
      metadata || {},
      methodDescriptor_GameService_AddNewUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.UserId,
 *   !proto.Empty>}
 */
const methodDescriptor_GameService_RemoveUser = new grpc.web.MethodDescriptor(
  '/GameService/RemoveUser',
  grpc.web.MethodType.UNARY,
  proto.UserId,
  proto.Empty,
  /**
   * @param {!proto.UserId} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Empty.deserializeBinary
);


/**
 * @param {!proto.UserId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.removeUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/RemoveUser',
      request,
      metadata || {},
      methodDescriptor_GameService_RemoveUser,
      callback);
};


/**
 * @param {!proto.UserId} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Empty>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.removeUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/RemoveUser',
      request,
      metadata || {},
      methodDescriptor_GameService_RemoveUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Empty,
 *   !proto.GamesList>}
 */
const methodDescriptor_GameService_GetAllGames = new grpc.web.MethodDescriptor(
  '/GameService/GetAllGames',
  grpc.web.MethodType.UNARY,
  proto.Empty,
  proto.GamesList,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.GamesList.deserializeBinary
);


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.GamesList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.GamesList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.getAllGames =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/GetAllGames',
      request,
      metadata || {},
      methodDescriptor_GameService_GetAllGames,
      callback);
};


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.GamesList>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.getAllGames =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/GetAllGames',
      request,
      metadata || {},
      methodDescriptor_GameService_GetAllGames);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.GameInfo,
 *   !proto.GameInfo>}
 */
const methodDescriptor_GameService_AddNewGame = new grpc.web.MethodDescriptor(
  '/GameService/AddNewGame',
  grpc.web.MethodType.UNARY,
  proto.GameInfo,
  proto.GameInfo,
  /**
   * @param {!proto.GameInfo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.GameInfo.deserializeBinary
);


/**
 * @param {!proto.GameInfo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.GameInfo)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.GameInfo>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.addNewGame =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/AddNewGame',
      request,
      metadata || {},
      methodDescriptor_GameService_AddNewGame,
      callback);
};


/**
 * @param {!proto.GameInfo} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.GameInfo>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.addNewGame =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/AddNewGame',
      request,
      metadata || {},
      methodDescriptor_GameService_AddNewGame);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.AddUserMessage,
 *   !proto.Result>}
 */
const methodDescriptor_GameService_AddUserToGame = new grpc.web.MethodDescriptor(
  '/GameService/AddUserToGame',
  grpc.web.MethodType.UNARY,
  proto.AddUserMessage,
  proto.Result,
  /**
   * @param {!proto.AddUserMessage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Result.deserializeBinary
);


/**
 * @param {!proto.AddUserMessage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Result)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Result>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.addUserToGame =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/AddUserToGame',
      request,
      metadata || {},
      methodDescriptor_GameService_AddUserToGame,
      callback);
};


/**
 * @param {!proto.AddUserMessage} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Result>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.addUserToGame =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/AddUserToGame',
      request,
      metadata || {},
      methodDescriptor_GameService_AddUserToGame);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.UserId,
 *   !proto.GamesList>}
 */
const methodDescriptor_GameService_GetUsersGames = new grpc.web.MethodDescriptor(
  '/GameService/GetUsersGames',
  grpc.web.MethodType.UNARY,
  proto.UserId,
  proto.GamesList,
  /**
   * @param {!proto.UserId} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.GamesList.deserializeBinary
);


/**
 * @param {!proto.UserId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.GamesList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.GamesList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.getUsersGames =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/GetUsersGames',
      request,
      metadata || {},
      methodDescriptor_GameService_GetUsersGames,
      callback);
};


/**
 * @param {!proto.UserId} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.GamesList>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.getUsersGames =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/GetUsersGames',
      request,
      metadata || {},
      methodDescriptor_GameService_GetUsersGames);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.GameId,
 *   !proto.Empty>}
 */
const methodDescriptor_GameService_CloseGame = new grpc.web.MethodDescriptor(
  '/GameService/CloseGame',
  grpc.web.MethodType.UNARY,
  proto.GameId,
  proto.Empty,
  /**
   * @param {!proto.GameId} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Empty.deserializeBinary
);


/**
 * @param {!proto.GameId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.closeGame =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/CloseGame',
      request,
      metadata || {},
      methodDescriptor_GameService_CloseGame,
      callback);
};


/**
 * @param {!proto.GameId} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Empty>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.closeGame =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/CloseGame',
      request,
      metadata || {},
      methodDescriptor_GameService_CloseGame);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.UserChange,
 *   !proto.Empty>}
 */
const methodDescriptor_GameService_StartGame = new grpc.web.MethodDescriptor(
  '/GameService/StartGame',
  grpc.web.MethodType.UNARY,
  proto.UserChange,
  proto.Empty,
  /**
   * @param {!proto.UserChange} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Empty.deserializeBinary
);


/**
 * @param {!proto.UserChange} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.startGame =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/StartGame',
      request,
      metadata || {},
      methodDescriptor_GameService_StartGame,
      callback);
};


/**
 * @param {!proto.UserChange} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Empty>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.startGame =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/StartGame',
      request,
      metadata || {},
      methodDescriptor_GameService_StartGame);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.GameId,
 *   !proto.GameCourse>}
 */
const methodDescriptor_GameService_GetGameCourseInfo = new grpc.web.MethodDescriptor(
  '/GameService/GetGameCourseInfo',
  grpc.web.MethodType.UNARY,
  proto.GameId,
  proto.GameCourse,
  /**
   * @param {!proto.GameId} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.GameCourse.deserializeBinary
);


/**
 * @param {!proto.GameId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.GameCourse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.GameCourse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.getGameCourseInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/GetGameCourseInfo',
      request,
      metadata || {},
      methodDescriptor_GameService_GetGameCourseInfo,
      callback);
};


/**
 * @param {!proto.GameId} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.GameCourse>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.getGameCourseInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/GetGameCourseInfo',
      request,
      metadata || {},
      methodDescriptor_GameService_GetGameCourseInfo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.SubGameIdRequest,
 *   !proto.SubGameId>}
 */
const methodDescriptor_GameService_GetSubGameId = new grpc.web.MethodDescriptor(
  '/GameService/GetSubGameId',
  grpc.web.MethodType.UNARY,
  proto.SubGameIdRequest,
  proto.SubGameId,
  /**
   * @param {!proto.SubGameIdRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.SubGameId.deserializeBinary
);


/**
 * @param {!proto.SubGameIdRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.SubGameId)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.SubGameId>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.getSubGameId =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/GetSubGameId',
      request,
      metadata || {},
      methodDescriptor_GameService_GetSubGameId,
      callback);
};


/**
 * @param {!proto.SubGameIdRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.SubGameId>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.getSubGameId =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/GetSubGameId',
      request,
      metadata || {},
      methodDescriptor_GameService_GetSubGameId);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.EndSubGameRequest,
 *   !proto.Empty>}
 */
const methodDescriptor_GameService_EndSubGame = new grpc.web.MethodDescriptor(
  '/GameService/EndSubGame',
  grpc.web.MethodType.UNARY,
  proto.EndSubGameRequest,
  proto.Empty,
  /**
   * @param {!proto.EndSubGameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Empty.deserializeBinary
);


/**
 * @param {!proto.EndSubGameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.endSubGame =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/EndSubGame',
      request,
      metadata || {},
      methodDescriptor_GameService_EndSubGame,
      callback);
};


/**
 * @param {!proto.EndSubGameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Empty>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.endSubGame =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/EndSubGame',
      request,
      metadata || {},
      methodDescriptor_GameService_EndSubGame);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Move,
 *   !proto.Board>}
 */
const methodDescriptor_GameService_DoMove = new grpc.web.MethodDescriptor(
  '/GameService/DoMove',
  grpc.web.MethodType.UNARY,
  proto.Move,
  proto.Board,
  /**
   * @param {!proto.Move} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Board.deserializeBinary
);


/**
 * @param {!proto.Move} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Board)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Board>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.doMove =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/DoMove',
      request,
      metadata || {},
      methodDescriptor_GameService_DoMove,
      callback);
};


/**
 * @param {!proto.Move} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Board>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.doMove =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/DoMove',
      request,
      metadata || {},
      methodDescriptor_GameService_DoMove);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.BoardInfoRequest,
 *   !proto.Board>}
 */
const methodDescriptor_GameService_GetBoardInfo = new grpc.web.MethodDescriptor(
  '/GameService/GetBoardInfo',
  grpc.web.MethodType.UNARY,
  proto.BoardInfoRequest,
  proto.Board,
  /**
   * @param {!proto.BoardInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Board.deserializeBinary
);


/**
 * @param {!proto.BoardInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Board)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Board>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.getBoardInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/GetBoardInfo',
      request,
      metadata || {},
      methodDescriptor_GameService_GetBoardInfo,
      callback);
};


/**
 * @param {!proto.BoardInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Board>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.getBoardInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/GetBoardInfo',
      request,
      metadata || {},
      methodDescriptor_GameService_GetBoardInfo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.GameId,
 *   !proto.GameCourse>}
 */
const methodDescriptor_GameService_GoNext = new grpc.web.MethodDescriptor(
  '/GameService/GoNext',
  grpc.web.MethodType.UNARY,
  proto.GameId,
  proto.GameCourse,
  /**
   * @param {!proto.GameId} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.GameCourse.deserializeBinary
);


/**
 * @param {!proto.GameId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.GameCourse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.GameCourse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.goNext =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/GoNext',
      request,
      metadata || {},
      methodDescriptor_GameService_GoNext,
      callback);
};


/**
 * @param {!proto.GameId} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.GameCourse>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.goNext =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/GoNext',
      request,
      metadata || {},
      methodDescriptor_GameService_GoNext);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.GameId,
 *   !proto.Result>}
 */
const methodDescriptor_GameService_AreAllGameCourseOver = new grpc.web.MethodDescriptor(
  '/GameService/AreAllGameCourseOver',
  grpc.web.MethodType.UNARY,
  proto.GameId,
  proto.Result,
  /**
   * @param {!proto.GameId} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Result.deserializeBinary
);


/**
 * @param {!proto.GameId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Result)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Result>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.areAllGameCourseOver =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/AreAllGameCourseOver',
      request,
      metadata || {},
      methodDescriptor_GameService_AreAllGameCourseOver,
      callback);
};


/**
 * @param {!proto.GameId} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Result>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.areAllGameCourseOver =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/AreAllGameCourseOver',
      request,
      metadata || {},
      methodDescriptor_GameService_AreAllGameCourseOver);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Move,
 *   !proto.Empty>}
 */
const methodDescriptor_GameService_DoMoveStream = new grpc.web.MethodDescriptor(
  '/GameService/DoMoveStream',
  grpc.web.MethodType.UNARY,
  proto.Move,
  proto.Empty,
  /**
   * @param {!proto.Move} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Empty.deserializeBinary
);


/**
 * @param {!proto.Move} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.doMoveStream =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameService/DoMoveStream',
      request,
      metadata || {},
      methodDescriptor_GameService_DoMoveStream,
      callback);
};


/**
 * @param {!proto.Move} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Empty>}
 *     Promise that resolves to the response
 */
proto.GameServicePromiseClient.prototype.doMoveStream =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameService/DoMoveStream',
      request,
      metadata || {},
      methodDescriptor_GameService_DoMoveStream);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.BoardInfoRequest,
 *   !proto.Board>}
 */
const methodDescriptor_GameService_BoardStream = new grpc.web.MethodDescriptor(
  '/GameService/BoardStream',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.BoardInfoRequest,
  proto.Board,
  /**
   * @param {!proto.BoardInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Board.deserializeBinary
);


/**
 * @param {!proto.BoardInfoRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.Board>}
 *     The XHR Node Readable Stream
 */
proto.GameServiceClient.prototype.boardStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/GameService/BoardStream',
      request,
      metadata || {},
      methodDescriptor_GameService_BoardStream);
};


/**
 * @param {!proto.BoardInfoRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.Board>}
 *     The XHR Node Readable Stream
 */
proto.GameServicePromiseClient.prototype.boardStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/GameService/BoardStream',
      request,
      metadata || {},
      methodDescriptor_GameService_BoardStream);
};


module.exports = proto;

