package wfk.process.dao.sql.service;

import wfk.process.dao.sql.entity.WFKProductFile;

public interface WFKProductFileMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(WFKProductFile record);

    int insertSelective(WFKProductFile record);

    WFKProductFile selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WFKProductFile record);

    int updateByPrimaryKey(WFKProductFile record);
}