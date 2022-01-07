/*
 Navicat Premium Data Transfer

 Source Server         : qybmath
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Schema         : qyb

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 07/01/2022 17:00:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Clarification
-- ----------------------------
DROP TABLE IF EXISTS `Clarification`;
CREATE TABLE `Clarification` (
  `ClarificationID` int NOT NULL AUTO_INCREMENT,
  `FromUID` int DEFAULT NULL,
  `ToContestID` int DEFAULT NULL,
  `TimeStamp` datetime DEFAULT NULL,
  `ClarificationObject` mediumtext,
  `Valid` int DEFAULT '1',
  PRIMARY KEY (`ClarificationID`),
  KEY `Cl_FromUID` (`FromUID`) USING BTREE,
  KEY `Cl_ToContestID` (`ToContestID`) USING BTREE,
  CONSTRAINT `Cl_FromUID` FOREIGN KEY (`FromUID`) REFERENCES `User` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Cl_ToContestID` FOREIGN KEY (`ToContestID`) REFERENCES `Contest` (`ContestID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='某个比赛对题目的解释';

-- ----------------------------
-- Table structure for Clarification_Request
-- ----------------------------
DROP TABLE IF EXISTS `Clarification_Request`;
CREATE TABLE `Clarification_Request` (
  `CReqID` int NOT NULL AUTO_INCREMENT,
  `FromUID` int DEFAULT NULL,
  `ToContestID` int DEFAULT NULL,
  `TimeStamp` datetime DEFAULT NULL,
  `RequestObject` mediumtext,
  `RequestStatus` varchar(255) DEFAULT NULL,
  `Valid` int DEFAULT '1',
  PRIMARY KEY (`CReqID`),
  KEY `ClR_FromUID` (`FromUID`) USING BTREE,
  KEY `CIR_ToContestID` (`ToContestID`) USING BTREE,
  CONSTRAINT `CIR_ToContestID` FOREIGN KEY (`ToContestID`) REFERENCES `Contest` (`ContestID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ClR_FromUID` FOREIGN KEY (`FromUID`) REFERENCES `User` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='某个比赛对题目解释的请求';

-- ----------------------------
-- Table structure for Contest
-- ----------------------------
DROP TABLE IF EXISTS `Contest`;
CREATE TABLE `Contest` (
  `ContestID` int NOT NULL AUTO_INCREMENT,
  `ContestType` int DEFAULT NULL COMMENT '例如, 0是普通, 1是ACM赛制',
  `ShortName` varchar(255) DEFAULT NULL COMMENT '例如, 三初一试、五初二试, 面向管理员',
  `Classification` varchar(255) DEFAULT NULL COMMENT '例如, 2020年全员杯网络数学竞赛',
  `Name` varchar(255) DEFAULT NULL COMMENT '例如 全员杯挑战赛(第三届), 或者 初中组(试卷一)',
  `ActivateTime` datetime DEFAULT NULL COMMENT '过激活时间才可以在系统中看到',
  `StartTime` datetime DEFAULT NULL,
  `EndTime` datetime DEFAULT NULL,
  `FinalizeTime` datetime DEFAULT NULL COMMENT '成绩锁定的时间',
  `DeactivateTime` datetime DEFAULT NULL COMMENT '反激活后将变成历史竞赛',
  `PubliclyVisible` int DEFAULT '1' COMMENT '是否对非管理员可见',
  `FullPdfPath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'PDF, 手动导入的完整赛题',
  `isDoubleCheck` int DEFAULT '0' COMMENT '是否启用双评评分',
  `FullPdfAnsPath` varchar(255) DEFAULT NULL COMMENT 'PDF, 完整答案',
  `ShowProblemProvider` int DEFAULT '1' COMMENT '是否显示供题人',
  `Valid` int DEFAULT '1',
  `AvailableAsCurrent` int DEFAULT '1' COMMENT '是否允许切换到该比赛',
  `FreezeTime` datetime DEFAULT NULL COMMENT '排行榜冻结时间',
  `UnfreezeTime` datetime DEFAULT NULL COMMENT '排行榜解冻时间',
  PRIMARY KEY (`ContestID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='\n一场完整的比赛\n这样的语句会自动计算并插入: 本试卷共 4 页，22 题。全卷满分 150 分。考试用时 120 分钟(20:00 – 22:00)。 \n';

-- ----------------------------
-- Table structure for Contest Rule
-- ----------------------------
DROP TABLE IF EXISTS `Contest Rule`;
CREATE TABLE `Contest Rule` (
  `ContestID` int NOT NULL,
  `RuleObject` mediumtext,
  `Valid` int DEFAULT '1',
  PRIMARY KEY (`ContestID`),
  CONSTRAINT `ContestRuleRef` FOREIGN KEY (`ContestID`) REFERENCES `Contest` (`ContestID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='比赛规则(说明文本)';

-- ----------------------------
-- Table structure for Contest_ACM
-- ----------------------------
DROP TABLE IF EXISTS `Contest_ACM`;
CREATE TABLE `Contest_ACM` (
  `ContestID` int NOT NULL,
  `FreezeTime` datetime DEFAULT NULL COMMENT '冻结排行榜的时间',
  `UnfreezeTime` datetime DEFAULT NULL COMMENT '排行榜冻结取消的时间',
  `Valid` int DEFAULT '1',
  PRIMARY KEY (`ContestID`),
  CONSTRAINT `ACMContestRef` FOREIGN KEY (`ContestID`) REFERENCES `Contest` (`ContestID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='ACM赛制的比赛, 用于获得与ACM赛制相关的信息';

-- ----------------------------
-- Table structure for Contest_Candidate
-- ----------------------------
DROP TABLE IF EXISTS `Contest_Candidate`;
CREATE TABLE `Contest_Candidate` (
  `CandidateID` int NOT NULL AUTO_INCREMENT,
  `UID` int DEFAULT NULL,
  `ContestID` int DEFAULT NULL,
  `Valid` int DEFAULT '1',
  PRIMARY KEY (`CandidateID`),
  KEY `CC_UID` (`UID`),
  KEY `CC_ContestID` (`ContestID`) USING BTREE,
  CONSTRAINT `CC_ContestID` FOREIGN KEY (`ContestID`) REFERENCES `Contest` (`ContestID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `CC_UID` FOREIGN KEY (`UID`) REFERENCES `User` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='参赛者, 方便查询参加过的比赛';

-- ----------------------------
-- Table structure for Contest_Group
-- ----------------------------
DROP TABLE IF EXISTS `Contest_Group`;
CREATE TABLE `Contest_Group` (
  `ContestGroupID` int NOT NULL AUTO_INCREMENT,
  `ContestID_0` int DEFAULT NULL COMMENT '一试',
  `ContestID_1` int DEFAULT NULL COMMENT '二试',
  `ContestID_2` int DEFAULT NULL COMMENT '三试或其他(如果有)',
  `ContestIDObject` mediumtext COMMENT '预留空间',
  `Weight_0` double DEFAULT NULL COMMENT '一试占比',
  `Weight_1` double DEFAULT NULL COMMENT '二试占比',
  `Weight_2` double DEFAULT NULL COMMENT 'X试占比',
  `Valid` int DEFAULT '1',
  PRIMARY KEY (`ContestGroupID`),
  KEY `ContestGroupRef` (`ContestID_0`),
  KEY `ContestGroupRef1` (`ContestID_1`),
  KEY `ContestGroupRef2` (`ContestID_2`),
  CONSTRAINT `ContestGroupRef` FOREIGN KEY (`ContestID_0`) REFERENCES `Contest` (`ContestID`),
  CONSTRAINT `ContestGroupRef1` FOREIGN KEY (`ContestID_1`) REFERENCES `Contest` (`ContestID`),
  CONSTRAINT `ContestGroupRef2` FOREIGN KEY (`ContestID_2`) REFERENCES `Contest` (`ContestID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='普通赛制的比赛组, 包含多场比赛, 仅用于统计成绩\n\n加入比赛组的比赛不允许被删除.';

-- ----------------------------
-- Table structure for Contest_Group_Score
-- ----------------------------
DROP TABLE IF EXISTS `Contest_Group_Score`;
CREATE TABLE `Contest_Group_Score` (
  `GroupResultID` int NOT NULL AUTO_INCREMENT,
  `ContestGroupID` int DEFAULT NULL,
  `UID` int DEFAULT NULL,
  `UserInfoObject` mediumtext,
  `Score0` double(255,0) DEFAULT NULL,
  `Score1` double(255,0) DEFAULT NULL,
  `Score2` double(255,0) DEFAULT NULL,
  `ScoreObject` mediumtext,
  `Valid` int DEFAULT '1',
  PRIMARY KEY (`GroupResultID`),
  KEY `CGS_GroupID` (`ContestGroupID`) USING BTREE,
  KEY `CGS_UID` (`UID`) USING BTREE,
  CONSTRAINT `CGS_GroupID` FOREIGN KEY (`ContestGroupID`) REFERENCES `Contest_Group` (`ContestGroupID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `CGS_UID` FOREIGN KEY (`UID`) REFERENCES `User` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='比赛组的分数统计';

-- ----------------------------
-- Table structure for Contest_Problem
-- ----------------------------
DROP TABLE IF EXISTS `Contest_Problem`;
CREATE TABLE `Contest_Problem` (
  `ContestProblemID` int NOT NULL AUTO_INCREMENT,
  `NickName` varchar(255) DEFAULT NULL COMMENT '题目的新名字',
  `ContestID` int DEFAULT NULL,
  `ProblemID` int DEFAULT NULL,
  `RelativeOrder` int DEFAULT NULL COMMENT '排序第二关键字, 小题号, 0,1,2',
  `Points` int DEFAULT NULL COMMENT '分值, 自动渲染为(x分)',
  `SplitPdfPath` varchar(255) DEFAULT NULL COMMENT 'PDF, 单独赛题',
  `SplitAnsPdfPath` varchar(255) DEFAULT NULL COMMENT 'PDF, 单独答案',
  `Valid` int DEFAULT '1',
  `TimesAllowTry` int DEFAULT '0' COMMENT '是否限制试答次数, 0为不限制',
  `isAutomaticCheck` int DEFAULT '0' COMMENT '是否自动判卷',
  PRIMARY KEY (`ContestProblemID`),
  KEY `CP_ProblemID` (`ProblemID`),
  KEY `CP_ContestID_1` (`ContestID`),
  CONSTRAINT `CP_ContestID_1` FOREIGN KEY (`ContestID`) REFERENCES `Contest` (`ContestID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `CP_ProblemID` FOREIGN KEY (`ProblemID`) REFERENCES `Problem` (`ProblemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='被添加到竞赛中的题目';

-- ----------------------------
-- Table structure for Contest_Score
-- ----------------------------
DROP TABLE IF EXISTS `Contest_Score`;
CREATE TABLE `Contest_Score` (
  `ResultID` int NOT NULL AUTO_INCREMENT,
  `ContestID` int DEFAULT NULL,
  `UID` int DEFAULT NULL,
  `UserInfoObject` mediumtext COMMENT '用于展示的用户信息',
  `Score1` double DEFAULT NULL COMMENT '第一分数关键字',
  `Score2` double DEFAULT NULL COMMENT '第二分数关键字',
  `Score3` double DEFAULT NULL COMMENT '第三分数关键字',
  `ScoreObject` mediumtext COMMENT '分数详情对象',
  `Valid` int DEFAULT '1',
  PRIMARY KEY (`ResultID`),
  KEY `CCScore_ContestID` (`ContestID`) USING BTREE,
  KEY `CCScore_UID` (`UID`) USING BTREE,
  CONSTRAINT `CCScore_ContestID` FOREIGN KEY (`ContestID`) REFERENCES `Contest` (`ContestID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `CCScore_UID` FOREIGN KEY (`UID`) REFERENCES `User` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='比赛的分数统计';

-- ----------------------------
-- Table structure for Contest_Submit
-- ----------------------------
DROP TABLE IF EXISTS `Contest_Submit`;
CREATE TABLE `Contest_Submit` (
  `SubmitID` int NOT NULL AUTO_INCREMENT,
  `ContestProblemID` int NOT NULL,
  `CandidateID` int DEFAULT NULL COMMENT '参赛者',
  `Time` datetime DEFAULT NULL COMMENT '提交时间',
  `IP` varchar(255) DEFAULT NULL COMMENT '提交发起者IP',
  `SubmitObject` mediumtext COMMENT '提交内容对象',
  `hasScore` int DEFAULT '0' COMMENT '是否已打分, 默认0',
  `ResultSummary` varchar(255) DEFAULT NULL COMMENT '结果简述',
  `Valid` int DEFAULT '1',
  PRIMARY KEY (`SubmitID`),
  KEY `CS_CP_Ref` (`ContestProblemID`) USING BTREE,
  KEY `CS_Candidate_Ref` (`CandidateID`) USING BTREE,
  CONSTRAINT `CS_Candidate_Ref` FOREIGN KEY (`CandidateID`) REFERENCES `Contest_Candidate` (`CandidateID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `CS_CP_Ref` FOREIGN KEY (`ContestProblemID`) REFERENCES `Contest_Problem` (`ContestProblemID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='参赛者的提交';

-- ----------------------------
-- Table structure for Current_Contest
-- ----------------------------
DROP TABLE IF EXISTS `Current_Contest`;
CREATE TABLE `Current_Contest` (
  `UID` int NOT NULL COMMENT '10000是全局默认比赛',
  `ContestID` int DEFAULT NULL COMMENT '只有对于能进入控制台的用户有效',
  `Valid` int DEFAULT '1',
  PRIMARY KEY (`UID`),
  KEY `Cur_C_UID` (`UID`) USING BTREE,
  KEY `Cur_C_ContestID` (`ContestID`) USING BTREE,
  CONSTRAINT `Cur_C_ContestID` FOREIGN KEY (`ContestID`) REFERENCES `Contest` (`ContestID`) ON DELETE SET NULL,
  CONSTRAINT `Cur_C_UID` FOREIGN KEY (`UID`) REFERENCES `User` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='当前比赛表, 只接受Active比赛';

-- ----------------------------
-- Table structure for Info
-- ----------------------------
DROP TABLE IF EXISTS `Info`;
CREATE TABLE `Info` (
  `Address` varchar(255) NOT NULL,
  `Title` mediumtext,
  `Content` longtext,
  `Valid` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`Address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='关于我们等文章';

-- ----------------------------
-- Table structure for Notification
-- ----------------------------
DROP TABLE IF EXISTS `Notification`;
CREATE TABLE `Notification` (
  `NotificationID` int NOT NULL AUTO_INCREMENT,
  `FromUID` int DEFAULT NULL,
  `ToUID` int DEFAULT NULL,
  `TimeStamp` datetime DEFAULT NULL,
  `NotificationObject` mediumtext,
  `isRead` int DEFAULT '0',
  `Valid` int DEFAULT '1',
  PRIMARY KEY (`NotificationID`),
  KEY `N_FromUID` (`FromUID`) USING BTREE,
  KEY `N_ToUID` (`ToUID`) USING BTREE,
  CONSTRAINT `N_FromUID` FOREIGN KEY (`FromUID`) REFERENCES `User` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `N_ToUID` FOREIGN KEY (`ToUID`) REFERENCES `User` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='站内通知功能';

-- ----------------------------
-- Table structure for Problem
-- ----------------------------
DROP TABLE IF EXISTS `Problem`;
CREATE TABLE `Problem` (
  `ProblemID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `AddedTime` datetime DEFAULT NULL,
  `DraftFilePath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '题目草稿',
  `ProblemObject` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '存储json, 标准化题目内容直接存储在这里',
  `UID` int DEFAULT NULL COMMENT '供题人',
  `DraftAnsPath` varchar(255) DEFAULT NULL,
  `AnswerObject` mediumtext,
  `Valid` int DEFAULT '1',
  PRIMARY KEY (`ProblemID`),
  KEY `Problem_UID` (`UID`) USING BTREE,
  CONSTRAINT `Problem_UID` FOREIGN KEY (`UID`) REFERENCES `User` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=10033 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='全员杯赛题草稿';

-- ----------------------------
-- Table structure for Submit_Score
-- ----------------------------
DROP TABLE IF EXISTS `Submit_Score`;
CREATE TABLE `Submit_Score` (
  `ScoreID` int NOT NULL AUTO_INCREMENT,
  `SubmitID` int DEFAULT NULL,
  `Point` double DEFAULT NULL COMMENT '所打分数',
  `UID` int DEFAULT NULL COMMENT '操作者',
  `Comment` varchar(255) DEFAULT NULL COMMENT '说明',
  `Valid` int DEFAULT '1',
  PRIMARY KEY (`ScoreID`),
  KEY `CScore_SubmitID` (`SubmitID`) USING BTREE,
  KEY `CScore_UID` (`UID`) USING BTREE,
  CONSTRAINT `CScore_SubmitID` FOREIGN KEY (`SubmitID`) REFERENCES `Contest_Submit` (`SubmitID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `CScore_UID` FOREIGN KEY (`UID`) REFERENCES `User` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='对参赛者的提交打分';

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `UID` int NOT NULL AUTO_INCREMENT,
  `Nickname` varchar(255) DEFAULT NULL,
  `QQ` varchar(255) NOT NULL,
  `Mail` varchar(255) DEFAULT NULL,
  `PasswordHash` varchar(255) DEFAULT NULL,
  `Role` int DEFAULT '0' COMMENT '用户角色 0普通 1裁判2管理员',
  `RandomKey` varchar(255) DEFAULT NULL,
  `Valid` int DEFAULT '1',
  `Grade` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`UID`,`QQ`)
) ENGINE=InnoDB AUTO_INCREMENT=10031 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统统一用户';

-- ----------------------------
-- Table structure for UserInfo
-- ----------------------------
DROP TABLE IF EXISTS `UserInfo`;
CREATE TABLE `UserInfo` (
  `UID` int NOT NULL,
  `AvatarPath` varchar(255) DEFAULT NULL,
  `Valid` int DEFAULT '1',
  PRIMARY KEY (`UID`),
  KEY `Uinfo_ID` (`UID`) USING BTREE,
  CONSTRAINT `Uinfo_ID` FOREIGN KEY (`UID`) REFERENCES `User` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='存储用户附加信息如头像等';

-- ----------------------------
-- Table structure for UserPwReset
-- ----------------------------
DROP TABLE IF EXISTS `UserPwReset`;
CREATE TABLE `UserPwReset` (
  `PwResetID` int NOT NULL AUTO_INCREMENT,
  `UID` int DEFAULT NULL,
  `OriginalPasswordHash` varchar(255) DEFAULT NULL,
  `TimeStart` datetime DEFAULT NULL,
  `TimeExpires` datetime DEFAULT NULL,
  `ResetToken` varchar(255) NOT NULL COMMENT '重置口令',
  `Valid` int DEFAULT '1',
  PRIMARY KEY (`PwResetID`,`ResetToken`),
  KEY `PwResetUID` (`UID`) USING BTREE,
  CONSTRAINT `PwResetUID` FOREIGN KEY (`UID`) REFERENCES `User` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='密码重置功能';

SET FOREIGN_KEY_CHECKS = 1;
