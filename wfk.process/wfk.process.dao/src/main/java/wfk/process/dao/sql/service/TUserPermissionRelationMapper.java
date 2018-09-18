package wfk.process.dao.sql.service;

import wfk.process.dao.sql.entity.TUserPermissionRelation;

public interface TUserPermissionRelationMapper extends Mapper<TUserPermissionRelation> {
    int deleteByPrimaryKey(Integer id);

    int insert(TUserPermissionRelation record);

    int insertSelective(TUserPermissionRelation record);

    TUserPermissionRelation selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TUserPermissionRelation record);

    int updateByPrimaryKey(TUserPermissionRelation record);
}