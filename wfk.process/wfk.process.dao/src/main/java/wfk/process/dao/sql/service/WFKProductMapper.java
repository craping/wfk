package wfk.process.dao.sql.service;

import wfk.process.dao.sql.entity.WFKProduct;

public interface WFKProductMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(WFKProduct record);

    int insertSelective(WFKProduct record);

    WFKProduct selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WFKProduct record);

    int updateByPrimaryKey(WFKProduct record);
}