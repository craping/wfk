package wfk.process.dao.sql.entity;

public class WFKProductFile {
    private Integer id;

    private Integer pid;

    private Integer fileType;

    private String fileUrl;

    private String generalGrade;

    private Integer seq;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public Integer getFileType() {
        return fileType;
    }

    public void setFileType(Integer fileType) {
        this.fileType = fileType;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl == null ? null : fileUrl.trim();
    }

    public String getGeneralGrade() {
        return generalGrade;
    }

    public void setGeneralGrade(String generalGrade) {
        this.generalGrade = generalGrade == null ? null : generalGrade.trim();
    }

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }
}