package wfk.process.dao.sql.entity;

import java.math.BigDecimal;

public class WFKProduct {
    private Integer id;

    private String productName;

    private String productNameEn;

    private Integer stockId;

    private String brand;

    private String model;

    private String quality;

    private String qualityEn;

    private String generalGrade;

    private String zbdRate;

    private String rmaPolicy;

    private Integer quantity;

    private Integer moq;

    private String sample;

    private String sampleEn;

    private String stockLocation;

    private String stockLocationEn;

    private String delivery;

    private String deliveryEn;

    private String leadTime;

    private String leadTimeEn;

    private String priceTerm;

    private String priceTermEn;

    private BigDecimal unitPrice;

    private Double panelSize;

    private String panelType;

    private String composition;

    private String compositionEn;

    private String resolution;

    private String mode;

    private String modeEn;

    private String surface;

    private String surfaceEn;

    private String brightness;

    private String contrastRatio;

    private String displayColor;

    private String responseTime;

    private String viewingAngle;

    private String frequency;

    private String lampType;

    private String signalType;

    private String application;

    private String applicationEn;

    private Integer appType;

    private String fileUrl;

    private String images;

    private Integer status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName == null ? null : productName.trim();
    }

    public String getProductNameEn() {
        return productNameEn;
    }

    public void setProductNameEn(String productNameEn) {
        this.productNameEn = productNameEn == null ? null : productNameEn.trim();
    }

    public Integer getStockId() {
        return stockId;
    }

    public void setStockId(Integer stockId) {
        this.stockId = stockId;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand == null ? null : brand.trim();
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model == null ? null : model.trim();
    }

    public String getQuality() {
        return quality;
    }

    public void setQuality(String quality) {
        this.quality = quality == null ? null : quality.trim();
    }

    public String getQualityEn() {
        return qualityEn;
    }

    public void setQualityEn(String qualityEn) {
        this.qualityEn = qualityEn == null ? null : qualityEn.trim();
    }

    public String getGeneralGrade() {
        return generalGrade;
    }

    public void setGeneralGrade(String generalGrade) {
        this.generalGrade = generalGrade == null ? null : generalGrade.trim();
    }

    public String getZbdRate() {
        return zbdRate;
    }

    public void setZbdRate(String zbdRate) {
        this.zbdRate = zbdRate == null ? null : zbdRate.trim();
    }

    public String getRmaPolicy() {
        return rmaPolicy;
    }

    public void setRmaPolicy(String rmaPolicy) {
        this.rmaPolicy = rmaPolicy == null ? null : rmaPolicy.trim();
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getMoq() {
        return moq;
    }

    public void setMoq(Integer moq) {
        this.moq = moq;
    }

    public String getSample() {
        return sample;
    }

    public void setSample(String sample) {
        this.sample = sample == null ? null : sample.trim();
    }

    public String getSampleEn() {
        return sampleEn;
    }

    public void setSampleEn(String sampleEn) {
        this.sampleEn = sampleEn == null ? null : sampleEn.trim();
    }

    public String getStockLocation() {
        return stockLocation;
    }

    public void setStockLocation(String stockLocation) {
        this.stockLocation = stockLocation == null ? null : stockLocation.trim();
    }

    public String getStockLocationEn() {
        return stockLocationEn;
    }

    public void setStockLocationEn(String stockLocationEn) {
        this.stockLocationEn = stockLocationEn == null ? null : stockLocationEn.trim();
    }

    public String getDelivery() {
        return delivery;
    }

    public void setDelivery(String delivery) {
        this.delivery = delivery == null ? null : delivery.trim();
    }

    public String getDeliveryEn() {
        return deliveryEn;
    }

    public void setDeliveryEn(String deliveryEn) {
        this.deliveryEn = deliveryEn == null ? null : deliveryEn.trim();
    }

    public String getLeadTime() {
        return leadTime;
    }

    public void setLeadTime(String leadTime) {
        this.leadTime = leadTime == null ? null : leadTime.trim();
    }

    public String getLeadTimeEn() {
        return leadTimeEn;
    }

    public void setLeadTimeEn(String leadTimeEn) {
        this.leadTimeEn = leadTimeEn == null ? null : leadTimeEn.trim();
    }

    public String getPriceTerm() {
        return priceTerm;
    }

    public void setPriceTerm(String priceTerm) {
        this.priceTerm = priceTerm == null ? null : priceTerm.trim();
    }

    public String getPriceTermEn() {
        return priceTermEn;
    }

    public void setPriceTermEn(String priceTermEn) {
        this.priceTermEn = priceTermEn == null ? null : priceTermEn.trim();
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Double getPanelSize() {
        return panelSize;
    }

    public void setPanelSize(Double panelSize) {
        this.panelSize = panelSize;
    }

    public String getPanelType() {
        return panelType;
    }

    public void setPanelType(String panelType) {
        this.panelType = panelType == null ? null : panelType.trim();
    }

    public String getComposition() {
        return composition;
    }

    public void setComposition(String composition) {
        this.composition = composition == null ? null : composition.trim();
    }

    public String getCompositionEn() {
        return compositionEn;
    }

    public void setCompositionEn(String compositionEn) {
        this.compositionEn = compositionEn == null ? null : compositionEn.trim();
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution == null ? null : resolution.trim();
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode == null ? null : mode.trim();
    }

    public String getModeEn() {
        return modeEn;
    }

    public void setModeEn(String modeEn) {
        this.modeEn = modeEn == null ? null : modeEn.trim();
    }

    public String getSurface() {
        return surface;
    }

    public void setSurface(String surface) {
        this.surface = surface == null ? null : surface.trim();
    }

    public String getSurfaceEn() {
        return surfaceEn;
    }

    public void setSurfaceEn(String surfaceEn) {
        this.surfaceEn = surfaceEn == null ? null : surfaceEn.trim();
    }

    public String getBrightness() {
        return brightness;
    }

    public void setBrightness(String brightness) {
        this.brightness = brightness == null ? null : brightness.trim();
    }

    public String getContrastRatio() {
        return contrastRatio;
    }

    public void setContrastRatio(String contrastRatio) {
        this.contrastRatio = contrastRatio == null ? null : contrastRatio.trim();
    }

    public String getDisplayColor() {
        return displayColor;
    }

    public void setDisplayColor(String displayColor) {
        this.displayColor = displayColor == null ? null : displayColor.trim();
    }

    public String getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(String responseTime) {
        this.responseTime = responseTime == null ? null : responseTime.trim();
    }

    public String getViewingAngle() {
        return viewingAngle;
    }

    public void setViewingAngle(String viewingAngle) {
        this.viewingAngle = viewingAngle == null ? null : viewingAngle.trim();
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency == null ? null : frequency.trim();
    }

    public String getLampType() {
        return lampType;
    }

    public void setLampType(String lampType) {
        this.lampType = lampType == null ? null : lampType.trim();
    }

    public String getSignalType() {
        return signalType;
    }

    public void setSignalType(String signalType) {
        this.signalType = signalType == null ? null : signalType.trim();
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application == null ? null : application.trim();
    }

    public String getApplicationEn() {
        return applicationEn;
    }

    public void setApplicationEn(String applicationEn) {
        this.applicationEn = applicationEn == null ? null : applicationEn.trim();
    }

    public Integer getAppType() {
        return appType;
    }

    public void setAppType(Integer appType) {
        this.appType = appType;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl == null ? null : fileUrl.trim();
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images == null ? null : images.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}